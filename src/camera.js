import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

var target;

function setTarget(t) {
    target = t;
    camera.lookAt(t);
}

function setCameraPosition(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
}

function update() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.lookAt(target);
    camera.updateProjectionMatrix();
}

export default {
    raw: camera,
    setTarget: setTarget,
    update: update,
}

//TODO: change this coordinates once the robot is added
const pos1 = [500, 500, 500];
const pos2 = [0, 500, 500];
const pos3 = [0, 500, 0];
const pos4 = [0, -500, 0];
const pos5 = [500, 500, 0];

setCameraPosition(pos1[0], pos1[1], pos1[2]);

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case '1':
            console.log("[INFO]: camera1");
            setCameraPosition(pos1[0], pos1[1], pos1[2]);
            camera.lookAt(target);
            break;
        case '2':
            console.log("[INFO]: camera2");
            setCameraPosition(pos2[0], pos2[1], pos2[2]);
            camera.lookAt(target);
            break;
        case '3':
            console.log("[INFO]: camera3");
            setCameraPosition(pos3[0], pos3[1], pos3[2]);
            camera.lookAt(target);
            break;
        case '4':
            console.log("[INFO]: camera4");
            setCameraPosition(pos4[0], pos4[1], pos4[2]);
            camera.lookAt(target);
            break;
        case '5':
            console.log("[INFO]: camera5");
            setCameraPosition(pos5[0], pos5[1], pos5[2]);
            camera.lookAt(target);
            break;
    }
});
