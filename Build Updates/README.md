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
        <script src="https://preview.babylonjs.com/babylon.js"></script>
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
[playground.babylonjs.com](https://playground.babylonjs.com/)


## Ok, to get started, let's recreate what we just did in vscode, here in the playground.
1. Select all of the code that you see in left window, and delete it!

2. Now let's copy in the following code into that same window.
```javascript
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
```

## Sweet, let's move the sphere up a bit so that it doesn't intersect the ground.
1. We can directly control the position of any object in Babylon by adding or subtracting values to the x, y, or z coordnates.  Let's copy the following code snippet underneath the rest of our sphere code.
```javascript
    sphere.position.y = 2;
```
Once you've added that line, click the **Run** button to see the change you just made reflected instantly in the right window.

Nice Work!!!

## Let's make this scene a little more interesting by adding physics to the sphere!
1. We need to start by first telling the scene that we want to enable physics.  We can do that by copying the following code into our scene.  To keep things tidy, let's copy this in towards the top, directly under where we create the basic Babylon Scene Object
```javascript
    // enable physics in the scene
    scene.enablePhysics(new BABYLON.Vector3(0,-1,0), new BABYLON.AmmoJSPlugin());
```
2. Now we need to tell Babylon that the sphere is a physics object and should be controlled by the physics engine that we just enabled.  We can do that by copying the following code snippet underneath the rest of our 'sphere' code.
```javascript
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
```

Ok let's try hitting run again and seeing what happens.  Woohoo!  Pretty easy to apply physics to Babylon objects huh?


## Next up: we want the sphere to disappear when we click on it right?  Let's make that happen
1. First let's create an event that fires whenever a click happens.  Copy this snippet underneath all of our sphere code.
```javascript
    //add an event that fires when a click happens
    scene.onPointerObservable.add((e)=>{
        if(e.type == BABYLON.PointerEventTypes.POINTERDOWN){
            if(e.pickInfo.pickedMesh == sphere){
                fadeSphere(sphere);
            }
        }
    });
```
What's happening here, is that any time a click occurs, we check to see if a mesh was under the cursor.  If there was a mesh, we check to see if it was our sphere, and if so, we call a function and pass in our sphere object.

2. As you can probably guess, now we need to create that new function called 'fadeSphere.'  Let's copy the next snippet just below our newly added click event handler.
```javascript
//add a function that scales and fades the sphere
function fadeSphere(clickedSphere){
    clickedSphere.isPickable = false;
    BABYLON.Animation.CreateAndStartAnimation("sphereScaleDown", clickedSphere, "scaling.x", 30, 10, 1, 0.5, 0);
    BABYLON.Animation.CreateAndStartAnimation("sphereScaleDown", clickedSphere, "scaling.y", 30, 10, 1, 0.5, 0);
    BABYLON.Animation.CreateAndStartAnimation("sphereScaleDown", clickedSphere, "scaling.z", 30, 10, 1, 0.5, 0);
    BABYLON.Animation.CreateAndStartAnimation("sphereVisAnim", clickedSphere, "visibility", 30, 10, 1, 0, 0);
};
```
Once you've copied that over, let's try running the scene again and this time, try clicking on the sphere.

Pretty cool right?  If you look through the code inside the 'fadeSphere' function, what you'll see how easy it is to animate the properties of objects inside of Babylon.  The 5 numeric values that are passed into each animation are 
- frames per second
- the number of frames it should take to go from the starting value, to the ending value
- starting value
- ending value
- loop mode (boolean)


## Let's add a button into the scene that resets the game when it's clicked
1. Let's copy the following snippet underneath our sphere code.
```javascript
    // Create a button to restart the game
    var plane = BABYLON.Mesh.CreatePlane("plane", 40);
    plane.position.set(0, 2, 10);
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Start Game");
    button.width = 0.25;
    button.height = "40px";
    button.color = "white";
    button.background = "black";
    button.onPointerUpObservable.add(function () {
        resetGame();
    });
    advancedTexture.addControl(button);
```
Lots to dissect here, but at the highest level, what we're doing is creating a button with a label on it that says 'Start Game.' When that button is pressed we call a function called 'resetGame.'

2. Now we're going to need that function.  Copy this snippet underneath our fadeSphere function.
```javascript
function resetGame(){
    button.textBlock.text = "Reset Game";
    sphere.visibility = 1;
    sphere.scaling.x = 1;
    sphere.scaling.y = 1;
    sphere.scaling.z = 1;
    sphere.position.y = 2;
    sphere.isPickable = true;
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
};
```
When the button is pressed and the 'resetGame' function is called, we put the scale, position, and visibility of the sphere back to where we started. 

Click run to see our latest progress in action.


## Next thing we should add is the ability to keep score in our game.
1. We're going to start by creating a variable to hold our score count.  Copy the following snippet underneath our camera and lighting code near the top.
```javascript
    // Creat a variable to hold our score.
    var score = 0;
```

2. Ok let's make sure our score is updated whenever our sphere is clicked.  Copy the following snippet and paste it into the 'fadeSphere' function as the second line after the `clickedSphere.isPickable = false' line.
```javascript
    score++;
    button.textBlock.text = "Reset Game (Score: "+score+")";
```

3. Next let's make sure we reset the score when the reset button is pressed.  Copy and paste this snippet as the first thing that happens inside of the resetGame function.
```javascript
    score = 0;
```

Ok let's run this! Not bad!  We've got the makings of a game here.  Although...it's a pretty boring game.


## Let's make this game a little more intersting by adding in more spheres!
1. To start with, we're going to replace all of our current sphere creation code.  Find this code:
```javascript
    //Create a sphere for the scene
    var sphere = BABYLON.Mesh.CreateIcoSphere("sphere", {radius:0.8, flat:true, subdivisions: 16}, scene);
    sphere.material = new BABYLON.StandardMaterial("material", scene);
    sphere.material.diffuseColor = new BABYLON.Color3(0.588, 0.805, 0.896);
    sphere.position.y = 2;
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
```

and replace it with this:
```javascript
    // Create spheres
    var numberOfSpheres = 10;
    var spheres = [];
    for (let index = 0; index < numberOfSpheres; index++) {
        spheres[index] = BABYLON.Mesh.CreateIcoSphere("sphere", {radius:0.8, flat:true, subdivisions: 16}, this.scene);
        spheres[index].material = new BABYLON.StandardMaterial("material", scene)
        spheres[index].material.diffuseColor = new BABYLON.Color3(0.588, 0.805, 0.896)
        spheres[index].physicsImpostor = new BABYLON.PhysicsImpostor(spheres[index], BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
        spheres[index].position = new BABYLON.Vector3(Math.random() * 20 - 10, 10, Math.random() * 10 - 5);
    }
```
This new code shows you how loops work.  We loop through a series of code that creates a sphere, adds and modifies a material to that sphere, adds physics to that sphere, and gives it a random starting location.  It does this for the number of times specified by the numberOfSpheres variable. 

2. Next up is to replace the following code in the 'resetGame' function:
```javascript
    sphere.visibility = 1;
    sphere.scaling.x = 1;
    sphere.scaling.y = 1;
    sphere.scaling.z = 1;
    sphere.position.y = 2;
    sphere.isPickable = true;
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
```

with this:
```javascript
    for (let index = 0; index < numberOfSpheres; index++) {
        spheres[index].visibility = 1;
        spheres[index].scaling.x = 1;
        spheres[index].scaling.y = 1;
        spheres[index].scaling.z = 1;
	spheres[index].isPickable = true;
        spheres[index].position = new BABYLON.Vector3(Math.random() * 20 - 10, 10, Math.random() * 10 - 5);
        spheres[index].physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
    }
```
This basically does the same things we did to reset our first sphere, but does it for all of the spheres.

3. Ok last thing we have to update to get multiple spheres working in our game is to replace the following code:
```javascript
    //add an event that fires when a click happens
    scene.onPointerObservable.add((e)=>{
        if(e.type == BABYLON.PointerEventTypes.POINTERDOWN){
            if(e.pickInfo.pickedMesh == sphere){
                fadeSphere(sphere);
            }
        }
    });
```

with this:
```javascript
    // When a sphere is clicked update the score
    scene.onPointerObservable.add((e)=>{
        if(e.type == BABYLON.PointerEventTypes.POINTERDOWN){
            spheres.forEach((s)=>{
                if(e.pickInfo.pickedMesh == s){
                    fadeSphere(s);
                }
            });
        }
    });
```
Again, we're simply updating the code here to check and see if any of the spheres were underneath the cursor when a click occured.

Ok let's run this!  We've got a solid little game going here don't we?!!

## Congratulations!  You made a VR game entirely on the web!  And it wasn't that tricky either was it?  Be sure to keep playing and trying new things.  Here's a fantstic resource where you can dive in deeper into learning more about Babylon.js 

[doc.babylonjs.com](https://doc.babylonjs.com/)

One last fun thing to show you.  If you've saved your scene, you can go to settings in the playground and look for QR Code Link.  Grab your phone and get your camera out to scan this code...now you can take your VR game with you!
