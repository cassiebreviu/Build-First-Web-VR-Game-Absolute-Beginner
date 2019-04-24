var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene() {
    // Create scene
    var scene = new BABYLON.Scene(engine);

    // Add Camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 0), scene);
    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // Apply Gravity to Camera
    camera.applyGravity = true;

    // Add Light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);


    // Enable Physics and set gravtiy force with a vector
    var gravityVector = new BABYLON.Vector3(0, -10, 0);
    scene.enablePhysics(gravityVector, new BABYLON.CannonJSPlugin());


    // Create Ground
    var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(100, 1, 100);
    ground.position.y = -10.0;
    ground.checkCollisions = true;

    //Ground material
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

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

    // Enable VR
    // var vrHelper = scene.createDefaultVRExperience();
    // vrHelper.enableInteractions();

    return scene;
}

var addSpheres = function (scene, amount) {

    for (let index = 0; index < amount; index++) {
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, 10, Math.random() * 10 - 5);
        sphere.material = new BABYLON.StandardMaterial("sphere material", scene)
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
    }
}


var scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});