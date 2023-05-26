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
    scene.add(new THREE.AxesHelper(600));

    cameraControl.setTarget(new THREE.Vector3(95, 240, 110));
    camera = cameraControl.camera1;

    beepboop = new robot.Robot();
    trailer = new tow.Tow();

    // TODO: maybe this could refactored into the trailer itself, like the robot
    trailer.position.set(110, 135, -280);
    trailer.hitbox.setFromObject(trailer);
    //

    scene.add(beepboop, beepboop.hitboxHelper, trailer, trailer.hitboxHelper);

    animate();
}

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    beepboop.move();
    trailer.move();
    checkCollisions();
}

function checkCollisions() {
    console.log(beepboop.hitbox.intersectsBox(trailer.hitbox),
        beepboop.isTruck(), !trailer.isTowed());
    if (beepboop.hitbox.intersectsBox(trailer.hitbox) &&
        beepboop.isTruck() && !trailer.isTowed()) {
        trailer.plugInto(new THREE.Vector3()
            .add(beepboop.towPoint.position)
            .add(beepboop.position)
        );
    }
}

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

        case 'q':
            beepboop.moveFeetUp();
            break;

        case 'a':
            beepboop.moveFeetDown();
            break;

        case 'w':
            beepboop.moveLegsUp();
            break;

        case 's':
            beepboop.moveLegsDown();
            break;

        case 'e':
            beepboop.moveArmsInwards();
            break;

        case 'd':
            beepboop.moveArmsOutwards();
            break;

        case 'r':
            beepboop.moveHeadDown();
            break;

        case 'f':
            beepboop.moveHeadUp();
            break;

        case 'ArrowLeft':
            trailer.moveLeft();
            break;

        case 'ArrowDown':
            trailer.moveDown();
            break;

        case 'ArrowUp':
            trailer.moveUp();
            break;

        case 'ArrowRight':
            trailer.moveRight();
            break;

        case 'j':
            trailer.moveLeft();
            break;

        case 'k':
            trailer.moveDown();
            break;

        case 'l':
            trailer.moveUp();
            break;

        case 'ç':
            trailer.moveRight();
            break;
        // for debugging purposes
        default:
            break;
    }

    if (keysPressed['6']) {
        console.log("[INFO]: toggling wireframe");
        beepboop.toggleWireframe();
    }
});

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
