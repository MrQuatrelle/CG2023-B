import * as THREE from "three";

const front = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2 + 100,
    - window.innerHeight / 2 - 100,
);

const lateral = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2 + 100,
    - window.innerHeight / 2 - 100,
);

const top = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2 + 100,
    - window.innerHeight / 2 - 100,
);

const isoOrthographic = new THREE.OrthographicCamera(
    - window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2 + 100,
    - window.innerHeight / 2 - 100,
);

const isoPerspective = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

var target;
const cameras = [front, lateral, top, isoOrthographic, isoPerspective]

function setTarget(t) {
    target = t;
    cameras.forEach((c) => {c.lookAt(t)});
}

function update() {
    /* TODO: it'd be nice if we could make something like this again...
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.lookAt(target);
        camera1.updateProjectionMatrix();
    */
}

//TODO: change this coordinates once the robot is added
front.position.set(1000, 240, 110);
lateral.position.set(95, 240, 1000);
top.position.set(95, 1000, 110);
isoOrthographic.position.set(500, 500, 500);
isoPerspective.position.set(500, 500, 500);

export default {
    setTarget: setTarget,
    camera1: front,
    camera2: lateral,
    camera3: top,
    camera4: isoOrthographic,
    camera5: isoPerspective,
}




