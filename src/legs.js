import * as THREE from "three";
import feet from "./feet.js";

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

// prepare left leg to plug to its pivot
leftLeg.position.set(0, -80, 20);

const leftLegHandle = new THREE.Object3D();
leftLegHandle.add(leftLeg);
leftLegHandle.position.set(100, 180, 0);
leftLegHandle.add(feet.left);

export default {
    left: leftLegHandle,
}
