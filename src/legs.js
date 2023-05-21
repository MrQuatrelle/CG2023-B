import * as THREE from "three";
import feet from "./feet.js";

// TODO: Would be like to refactor this if we have time...

// left leg creation
const leftLegGeom = new THREE.BoxGeometry(60, 160, 40);
const leftLegMesh = new THREE.Mesh(
    leftLegGeom,
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
const leftLegEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftLegGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const leftLeg = new THREE.Object3D();
leftLeg.add(leftLegMesh);
leftLeg.add(leftLegEdges);

// left thy creation
const leftThyGeom = new THREE.BoxGeometry(20, 80, 20);
const leftThyMesh = new THREE.Mesh(
    leftThyGeom,
    new THREE.MeshBasicMaterial({
        color: 0xbbbbbb
    })
);

const leftThyEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftThyGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const leftThy = new THREE.Object3D();
leftThy.add(leftThyMesh);
leftThy.add(leftThyEdges);

// prepare left leg and left foot to plug to its pivot
leftLeg.position.set(-10, -160, 20);
leftThy.position.set(-10, -40, 10);
feet.left.position.set(0, -240, 0);

const leftLegHandle = new THREE.Object3D();
leftLegHandle.add(leftLeg);
leftLegHandle.add(feet.left);
leftLegHandle.add(leftThy);

leftLegHandle.position.set(150, 260, 0);


// right leg creation
const rightLegGeom = new THREE.BoxGeometry(60, 160, 40);
const rightLegMesh = new THREE.Mesh(
    rightLegGeom,
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
const rightLegEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightLegGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const rightLeg = new THREE.Object3D();
rightLeg.add(rightLegMesh);
rightLeg.add(rightLegEdges);

// right thy creation
const rightThyGeom = new THREE.BoxGeometry(20, 80, 20);
const rightThyMesh = new THREE.Mesh(
    rightThyGeom,
    new THREE.MeshBasicMaterial({
        color: 0xbbbbbb
    })
);

const rightThyEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightThyGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const rightThy = new THREE.Object3D();
rightThy.add(rightThyMesh);
rightThy.add(rightThyEdges);

// prepare right leg and right foot to plug to its pivot
rightLeg.position.set(10, -160, 20);
rightThy.position.set(10, -40, 10);
feet.right.position.set(0, -240, 0);

const rightLegHandle = new THREE.Object3D();
rightLegHandle.add(rightLeg);
rightLegHandle.add(feet.right);
rightLegHandle.add(rightThy);

rightLegHandle.position.set(70, 260, 0);
export default {
    left: leftLegHandle,
    right: rightLegHandle,
}
