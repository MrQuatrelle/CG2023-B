import * as THREE from "three";
import wheel from "./wheels.js";

//create tow
const towGeom = new THREE.BoxGeometry(480, 160, 160);
const towMesh = new THREE.Mesh(
    towGeom,
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
const towEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(towGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const towHandle = new THREE.Object3D();
towHandle.add(towMesh);
towHandle.add(towEdges);
towHandle.position.set(0.0,0.0,0.0);
towHandle.rotation.y = Math.PI / (-2);

//create part for wheels
const supportGeom = new THREE.BoxGeometry(160, 40, 110);
const supportMesh = new THREE.Mesh(
    supportGeom,
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    })
);
const supportEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(supportGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

const supportHandle = new THREE.Object3D();
supportHandle.add(supportMesh);
supportHandle.add(supportEdges);
supportHandle.position.set(-160,-100,0.0);

towHandle.add(supportHandle);

const wheel1 = wheel.createWheel(-50,-10,68);
const wheel2 = wheel.createWheel(-50,-10,-68);
const wheel3= wheel.createWheel(50,-10,68);
const wheel4 = wheel.createWheel(50,-10,-68);

supportHandle.add(wheel1);
supportHandle.add(wheel2);
supportHandle.add(wheel3);
supportHandle.add(wheel4);

wheel1.rotation.y = Math.PI / (-2);
wheel2.rotation.y = Math.PI / (-2);
wheel3.rotation.y = Math.PI / (-2);
wheel4.rotation.y = Math.PI / (-2);

export default {
    tow: towHandle,
}