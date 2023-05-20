import * as THREE from "three";

// TODO: refactor feet into classes!

const leftFootGeom = new THREE.BoxGeometry(80, 20, 80);
const leftFootMesh = new THREE.Mesh(
    leftFootGeom,
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
const leftFootEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftFootGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const leftFoot = new THREE.Object3D();
leftFoot.add(leftFootMesh);
leftFoot.add(leftFootEdges);

// set up left foot to plug in to the pivot
leftFoot.position.set(0, -10, 40);

const leftFootHandle = new THREE.Object3D();
leftFootHandle.add(leftFoot);

leftFootHandle.position.set(120, 20, 0);


const rightFootGeom = new THREE.BoxGeometry(80, 20, 80);
const rightFootMesh = new THREE.Mesh(
    rightFootGeom,
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
const rightFootEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightFootGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const rightFoot = new THREE.Object3D();
rightFoot.add(rightFootMesh);
rightFoot.add(rightFootEdges);

// set up right foot to plug in to the pivot
rightFoot.position.set(0, -10, 40);

const rightFootHandle = new THREE.Object3D();
rightFootHandle.add(rightFoot);

rightFootHandle.position.set(40, 20, 0);

export default {
    left: leftFootHandle,
    right: rightFootHandle,
}

