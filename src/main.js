import * as THREE from "three";
import cameraControl from "./camera.js";
import robot from "./robot.js";
import tow from "./tow.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

var beepboop, trailer;
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
    scene.background = new THREE.Color(0xdddddd);
    scene.add(new THREE.AxesHelper(600));

    cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
    camera = cameraControl.camera1;

    beepboop = new robot.Robot();
    trailer = new tow.Tow();
    trailer.position.set(400, 140, 240);

    scene.add(beepboop, trailer);

    animate();
}

main();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraControl.update();
});

let keysPressed = {};

window.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;

    switch (e.key) {
        case '1':
            console.log("[INFO]: showing camera1");
            camera = cameraControl.camera1;
            break;

        case '2':
            console.log("[INFO]: showing camera2");
            camera = cameraControl.camera2;
            break;

        case '3':
            console.log("[INFO]: showing camera3");
            camera = cameraControl.camera3;
            break;

        case '4':
            console.log("[INFO]: showing camera4");
            camera = cameraControl.camera4;
            break;

        case '5':
            console.log("[INFO]: showing camera5");
            camera = cameraControl.camera5;
            break;

        // for debugging purposes
        default:
            console.log(e);
            break;
    }

    if (keysPressed['e']) {
        console.log("[INFO]: moving arms inwards");
        beepboop.moveArmsInwards();
    }

    if (keysPressed['d']) {
        console.log("[INFO]: moving arms inwards");
        beepboop.moveArmsOutwards();
    }

    if (keysPressed['q']) {
        console.log("[INFO]: moving feet up");
        beepboop.moveFeetUp();
    }

    if (keysPressed['a']) {
        console.log("[INFO]: moving feet down");
        beepboop.moveFeetDown();
    }

    if (keysPressed['w']) {
        console.log("[INFO]: Showing head");
        beepboop.rotateHeadUp();
    }

    if (keysPressed['s']) {
        console.log("[INFO]: Hidding head");
        beepboop.rotateHeadDown();
    }

    if (keysPressed['ArrowDown']) {
        console.log("[INFO]: moving tow +x");
        trailer.translateX(5);
    }

    if (keysPressed['ArrowUp']) {
        console.log("[INFO]: moving tow -x");
        trailer.translateX(-5);
    }

    if (keysPressed['ArrowLeft']) {
        console.log("[INFO]: moving tow +z");
        trailer.translateZ(5);
    }

    if (keysPressed['ArrowRight']) {
        console.log("[INFO]: moving tow -z");
        trailer.translateZ(-5);
    }

    // TODO: add the rest of the keybinds here
});

window.addEventListener("keyup", (e) => {
    delete keysPressed[e.key];
});
