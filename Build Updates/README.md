# Build your First Web VR Game for the Absolute Beginner
This is source and tutorial for building your first website and first web vr game - all in one!

### Create index.html and index.js files
1. Open VS code and create a new file called index.html
2. Copy and paste this html and css into the file. 
```html <!DOCTYPE html>
<html>

    <head>
        <style>
            html,
            body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                text-align: center;
            }

            #renderCanvas {
                width: 100%;
                height: 100%;
                touch-action: none;
            }
        </style>
        
        <!-- Babylon.js -->
        <script src="https://code.jquery.com/pep/0.4.2/pep.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js"></script>
        <script src="https://preview.babylonjs.com/ammo.js"></script>
        <script src="https://preview.babylonjs.com/cannon.js"></script>
        <script src="https://preview.babylonjs.com/Oimo.js"></script>
        <script src="https://preview.babylonjs.com/gltf_validator.js"></script>
        <script src="https://preview.babylonjs.com/earcut.min.js"></script>
        <script src="https://preview.babylonjs.com/babylon.js"></script>
        <script src="https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js"></script>
        <script src="https://preview.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script>
        <script src="https://preview.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js"></script>
        <script src="https://preview.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js"></script>
        <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.js"></script>
        <script src="https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js"></script>
        <script src="https://preview.babylonjs.com/gui/babylon.gui.min.js"></script>
    </head>

    <body>
        <canvas id="renderCanvas"></canvas>
        <script src="index.js"></script>
    </body>

</html>
```
3. Now create the index.js file and copy and paste this code into it.
```javascript
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	
	// Create camera and lighting
	var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, -25), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -0.5, 1.0), scene);
	light.position = new BABYLON.Vector3(0, 15, -6);
	
	// Create default environment
	var environment = scene.createDefaultEnvironment({
		skyboxSize: 300,
		groundSize: 200
	});
	environment.setMainColor(new BABYLON.Color3(0.1, 0.3, 0.5));
	
	//Create a sphere for the scene
	var sphere = BABYLON.Mesh.CreateIcoSphere("sphere", {radius:0.8, flat:true, subdivisions: 16}, scene);
	sphere.material = new BABYLON.StandardMaterial("material", scene);
	sphere.material.diffuseColor = new BABYLON.Color3(0.588, 0.805, 0.896);
	
	// Add vr
	var helper = scene.createDefaultVRExperience({createDeviceOrientationCamera: false})
	helper.enableInteractions()
	
    return scene;
};

var scene = createScene();

engine.runRenderLoop(() => {
scene.render();
});
```
4. Save file and navigate to the file explorer. Double click the index.html (browswer will open ooo ahhh I made a site)

Here we're going to switch over from vscode and the browser, to using the Babylon playground, located at:
[playground.babylonjs.com](playground.babylonjs.com)

## Ok, to get started, let's move the sphere up a bit so that it doesn't intersect the ground.
1. We can directly control the position of any object in Babylon by adding or subtracting values to the x, y, or z coordnates.  Let's copy the following code snippet underneath the rest of our sphere code.
```javascript
    sphere.position.y = 2;
```
Let's
2. Add gravity to the camera by pasting this code below `camera.attachControl(canvas, true);` on `line 16`
```javascript
    // Apply Gravity to Camera
    camera.applyGravity = true;
```
3. Enable physics and set the gravitational force with a vector on `line 22`
```javascript
    // Enable Physics and set gravtiy force with a vector
    var gravityVector = new BABYLON.Vector3(0, -1, 0);
    scene.enablePhysics(gravityVector, new BABYLON.CannonJSPlugin());
```
3. Add a `physicsImposter` to the `sphere` on `line 32`
```javascript
sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
```
4. Add a `physicsImposter` to the `ground` on `line 46`
```javascript
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
```
5. Save the changes and refresh the browser. You should now see the sphere fall from the sky and bounce on the ground.
NOTE: If you are having any issues check out this commit to the repo. Its what your files should look like after this step:
[Link to commit](https://github.com/cassieview/Build-First-Web-VR-Game-Absolute-Beginner/commit/49ede511f3f1eb33ecb9a3801bf2b4df8851434c)

## This is kinda cool. We now have one sphere falling from the sky and bouncing onto the ground. But wouldnt it be way cooler if you had lets say 10 spheres falling? Lets do that next!

1. Add `addSpheres` function on `line 56` below our `createScene` function
```javascript
var addSpheres = function (scene, amount) {
    for (let index = 0; index < amount; index++) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, 10, Math.random() * 10 - 5);
        sphere.material = new BABYLON.StandardMaterial("sphere material", scene);
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
    }
 }
```
2. Delete or comment out the code that was creating the sphere in the `createScene` function on `lines 27-32`.
```javascript
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
    sphere.position.y = 10;
    sphere.position.x = -10;
    sphere.position.z = -10;
    sphere.material = new BABYLON.StandardMaterial("sphere material", scene);
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
```
3. Add a call to the `addSpheres` function we just created. This goes on `line 27`. This is calling the function we created, passing in the scene we want to add the spheres to and defining how many spheres we want.
```javascript
addSpheres(scene, 10);
```

## Lets add a button to trigger the spheres falling from the sky
1. Copy and paste the below script on `line 43` below the `ground.physicsImpostor` variable. 
2. This block of code is doing multiple things:<br/>
    a. Creating a button and the button attributes. <br/>
    b. Creating a full screen canvas texture to add our button to. <br/>
    c. Then we moved the `addSpheres` method inside of the button event that fires on click. This will add the spheres and remove the          button visibility to make the game start.<br/>

```javascript
     // GUI
     var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

     var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Start Game");
     button.width = 0.2;
     button.height = "40px";
     button.color = "white";
     button.background = "blue";
     button.onPointerUpObservable.add(function () {
        addSpheres(scene,10);
        button.isVisible = false;
    });
    advancedTexture.addControl(button);  
```

## Make the spheres disappear on click (shoot) event
1. Add event with the `actionManager` to spheres so they disappear when shot. Copy and paste below on `line 70`
```javascript
      //add click event to sphere
      sphere.actionManager = new BABYLON.ActionManager(scene);
      sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            scene.removeMesh(sphere);
            score++;
            console.log("score: " + score);
      }));
```
2. We added score in the event so lets define the variable on `line 63`.
```javascript
    var score = 0;
```
3. Now we have spheres falling and we can click on them to disappear.  The problem here is that if the spheres just sit on the ground the player can keep shooting them. Lets remove the `ground.physicsImpostor` so spheres fall through instead of piling up. We can do this by commenting on the below code on `line 39`
```javascript
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5,               restitution: 0.7 }, scene);
```
4. Uncomment the enable VR block so that we can run our game in VR.
```javascript
    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableInteractions();
```

# Congrats! You built a game!
Now you have the basic workings of a game and the source for what you created is here in this repo. You can pick up right where you left off on any computer and continue to build out your game and add features. 

## How to host a static site on azure
1. Go to https://portal.azure.com
2. Click `Create a resource`
3. Click `Storage account`
4. Select `Create new` Resource Group
5. Give your storage account a name. Something like `myawesomegame`
6. Select a Location (this is the location of the data center that has all the servers ready for us to use)
7. Leave the defaults for all the other fields the click `Review + create`
8. Click Create. It will take a minute to deploy and create your resource
9. Go to the resource when you get the confirmation that it has been created
10. Click `Static website` from the left hand navigation then click `Enabled`
11. Index document name is `index.html` then click `Save`
12. Select the `$Web` link that appears after your save. This will bring us to the blob storage we want to upload our files to.
13. Click `Upload`
14. Click the Folder Icon to navigate to your `index.html` and `index.js` files that we created in this tutorial
15. Select both the `index.html` and `index.js` files and click open
16. Click `Upload`
17. Exit out of the upload pane by clicking the `X` in the upper right corner.
18. Select `Change access level` from the top nav
19. Select `Container (anonymous read access for containers and blobs)`
20. Select `OK`
21. Use the bread crumbs nav at the very top to navigate back to the static website pane.
22. Copy the `Primary endpoint` url and paste it into the browser. (Make sure the Index Document name is set to `index.html`) 
23. TADA! Your game is hosted! Thanks Azure! :D


## Here are ideas and code snippets for how you could continue to expand on the game.

### Add label to keep score
```javascript
    var scoreText = new BABYLON.GUI.TextBlock();
    scoreText.text = "Score: " + currentScore.toString();
    scoreText.color = "white";
    scoreText.fontSize = 24;
    advancedTexture.addControl(scoreText);
```
### Play with colors
1. One way to change the colors of meshes (spheres and ground) is to add light effects to the scenes light varible. Use Color3 which takes Red, Green, Blue (RGB) numbers to create a color. Add the below block of code on `line 20` and see how it changes the colors in your scene!
```javascript
   //Diffuse - the basic color or texture of the material as viewed under a light;
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    //Specular - the highlight given to the material by a light;
	light.specular = new BABYLON.Color3(0, 1, 0);
	light.groundColor = new BABYLON.Color3(0, 1, 0);
```
### Play with gravity to make the spheres fall faster or slower
```javascript
var gravityVector = new BABYLON.Vector3(0, -10, 0);
```

### Add Sound when sphere disappears
Docs to add sound: https://doc.babylonjs.com/how_to/playing_sounds_and_music

## Helpful Links
BabylonJS playground https://www.babylonjs-playground.com/ <br/>
Live example can be found at https://cloudvr.games


