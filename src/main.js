import * as THREE from "three";
import cameraControl from "./camera.js";
import robot from "./robot.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

var beepboop;
var camera;

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AxesHelper(600));
    cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
    camera = cameraControl.camera1;

    beepboop = new robot.Robot();
    scene.add(beepboop);

    animate();
}

main();

window.addEventListener("resize", () => {
    cameraControl.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case '1':
            console.log("[INFO]: camera1");
            camera = cameraControl.camera1;
            break;

        case '2':
            console.log("[INFO]: camera2");
            camera = cameraControl.camera2;
            break;

        case '3':
            console.log("[INFO]: camera3");
            camera = cameraControl.camera3;
            break;

        case '4':
            console.log("[INFO]: camera4");
            camera = cameraControl.camera4;
            break;

        case '5':
            console.log("[INFO]: camera5");
            camera = cameraControl.camera5;
            break;

        case 'e':
            console.log("[INFO]: moving arms inwards");
            beepboop.moveArmsInwards();
            break;

        case 'd':
            console.log("[INFO]: moving arms inwards");
            beepboop.moveArmsOutwards();
            break;

        // TODO: add the rest of the keybinds here
    }
});

