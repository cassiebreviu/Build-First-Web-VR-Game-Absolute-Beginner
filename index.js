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

    // Create sphere
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
    sphere.position.y = 10;
    sphere.position.x = -10;
    sphere.position.z = -10;
    sphere.material = new BABYLON.StandardMaterial("sphere material", scene);
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

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
  
    // Enable VR
    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableInteractions();

    return scene;
}

var scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});