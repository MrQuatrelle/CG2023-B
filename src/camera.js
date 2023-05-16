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
}

function setCameraPosition(x, y, z) {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
}

setCameraPosition(50, 50, 50);

export default {
    raw: camera,
    setTarget: setTarget,
}
