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

leftFoot.position.set(40, 10, 40);

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
rightFoot.r


rightFoot.position.set(40, 10, 120);

export default {
    left: leftFoot,
    right: rightFoot,
}

