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
    cameraControl.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("keydown", (e) => {
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

        case 'e':
            console.log("[INFO]: moving arms inwards");
            beepboop.moveArmsInwards();
            break;

        case 'd':
            console.log("[INFO]: moving arms inwards");
            beepboop.moveArmsOutwards();
            break;

        case 'q':
            console.log("[INFO]: moving feet up");
            beepboop.moveFeetUp();
            break;

        case 'a':
            console.log("[INFO]: moving feet down");
            beepboop.moveFeetDown();
            break;

       case 'ArrowDown':
           console.log("[INFO]: moving tow +x");
           trailer.translateX(5);
           break;
            
       case 'ArrowUp':
           console.log("[INFO]: moving tow -x");
           trailer.translateX(-5);
           break;
            
       case 'ArrowLeft':
           console.log("[INFO]: moving tow +z");
           trailer.translateZ(5);
           break;

       case 'ArrowRight':
           console.log("[INFO]: moving tow -z");
           trailer.translateZ(-5);
           break;

        // for debugging purposes
        default:
            console.log(e);
            break;

        // TODO: add the rest of the keybinds here
    }
});

