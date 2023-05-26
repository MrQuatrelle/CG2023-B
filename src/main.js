import * as THREE from "three";
import cameraControl from "./camera.js";
import robot from "./robot.js";
import tow from "./tow.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

var beepboop, trailer;
var camera;

main();

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0xdddddd);

    cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
    camera = cameraControl.camera5;

    beepboop = new robot.Robot();
    trailer = new tow.Tow();

    scene.add(beepboop, trailer);

    animate();
}

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    beepboop.move();
    trailer.move();
    checkCollisions();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function checkCollisions() {
    if (beepboop.hitbox.intersectsBox(trailer.hitbox) &&
        beepboop.isTruck() && !trailer.isTowed()) {
        trailer.plugInto(new THREE.Vector3()
            .add(beepboop.towPoint.position)
            .add(beepboop.position)
        );
    }

    if (trailer.isTowing()) {
        window.removeEventListener("keydown", keydownHandler);
    } else {
        window.addEventListener("keydown", keydownHandler);
    }
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraControl.update();
});

let keysPressed = {};

function keydownHandler(e) {
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

        case 'q':
            console.log("[INFO]: stretching feet");
            beepboop.moveFeetUp();
            break;

        case 'a':
            console.log("[INFO]: folding feet");
            beepboop.moveFeetDown();
            break;

        case 'w':
            console.log("[INFO]: stretching legs");
            beepboop.moveLegsUp();
            break;

        case 's':
            console.log("[INFO]: folding legs");
            beepboop.moveLegsDown();
            break;

        case 'e':
            console.log("[INFO]: hiding arms");
            beepboop.moveArmsInwards();
            break;

        case 'd':
            console.log("[INFO]: showing arms");
            beepboop.moveArmsOutwards();
            break;

        case 'r':
            console.log("[INFO]: hiding head");
            beepboop.moveHeadDown();
            break;

        case 'f':
            console.log("[INFO]: showing head");
            beepboop.moveHeadUp();
            break;

        case 'ArrowLeft':
            console.log("[INFO]: moving trailer to the left");
            trailer.moveLeft();
            break;

        case 'ArrowDown':
            console.log("[INFO]: moving trailer closer");
            trailer.moveDown();
            break;

        case 'ArrowUp':
            console.log("[INFO]: moving trailer away");
            trailer.moveUp();
            break;

        case 'ArrowRight':
            console.log("[INFO]: moving trailer to the right");
            trailer.moveRight();
            break;

        case 'j':
            console.log("[INFO]: moving trailer to the left");
            trailer.moveLeft();
            break;

        case 'k':
            console.log("[INFO]: moving trailer closer");
            trailer.moveDown();
            break;

        case 'l':
            console.log("[INFO]: moving trailer away");
            trailer.moveUp();
            break;

        case 'ç':
            console.log("[INFO]: moving trailer to the right");
            trailer.moveRight();
            break;

        default:
            console.log("[INFO]: unknown key");
            break;
    }

    if (keysPressed['6']) {
        console.log("[INFO]: toggling wireframe");
        beepboop.toggleWireframe();
    }
}

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'a':
            beepboop.stopFeet();
            break;

        case 'q':
            beepboop.stopFeet();
            break;

        case 'w':
            beepboop.stopLegs();
            break;

        case 's':
            beepboop.stopLegs();
            break;

        case 'e':
            beepboop.stopArms();
            break;

        case 'd':
            beepboop.stopArms();
            break;

        case 'r':
            beepboop.stopHead();
            break;

        case 'f':
            beepboop.stopHead();
            break;

        case 'ArrowLeft':
            trailer.stopLeft();
            break;

        case 'ArrowDown':
            trailer.stopDown();
            break;

        case 'ArrowUp':
            trailer.stopUp();
            break;

        case 'ArrowRight':
            trailer.stopRight();
            break;

        case 'j':
            trailer.stopLeft();
            break;

        case 'k':
            trailer.stopDown();
            break;

        case 'l':
            trailer.stopUp();
            break;

        case 'ç':
            trailer.stopRight();
            break;
    }
    delete keysPressed[e.key];
});
