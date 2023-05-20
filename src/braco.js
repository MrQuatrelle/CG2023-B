import * as THREE from "three";

var leftArmHandler, leftForearmHandler, leftArm, leftTubes, leftForearm, leftTubesHandler, rightArmHandler;

leftForearm = new THREE.Mesh(new THREE.BoxGeometry(120, 20, 20), mat);

leftTubes = new THREE.Mesh(new THREE.CylinderGeometry(10,10,10), mat);
leftTubes.position.set(50, 10, 0.0);

leftForearmHandler = new THREE.Object3D();
leftForearmHandler.add(leftForearm);
leftForearmHandler.position.set(120,0.0,0.0);

leftTubesHandler = new THREE.Object3D();
leftTubesHandler.add(leftTubes);
leftTubesHandler.position.set(120,0.0,0.0);

leftArm = new THREE.Mesh(new THREE.BoxGeometry(150,150,150), mat);

leftArmHandler = new THREE.Object3D();
leftArmHandler.add(leftArm);

//add handlers to left arm
leftArmHandler.add(tubesHandler);
leftArmHandler.add(leftForearmHandler);

export default {
    leftArm: leftArmHandler,
    rightArm: rightArmHandler,
}


