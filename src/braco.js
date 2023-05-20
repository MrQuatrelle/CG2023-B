import * as THREE from "three";

var leftArmHandler, leftForearmHandler, leftArm, leftTubes, leftForearm, leftTubesHandler, rightArmHandler;

var leftForearmGeom = new THREE.BoxGeometry(160, 30, 30);

leftForearm = new THREE.Mesh(leftForearmGeom, new THREE.MeshBasicMaterial({color: 0xff0000}));

const leftForearmEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftForearmGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

var leftTubesGeom = new THREE.CylinderGeometry(10,10,100)

leftTubes = new THREE.Mesh(leftTubesGeom, new THREE.MeshBasicMaterial({color: 0xff0000}));

const leftTubeEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftTubesGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);


//leftTubes.position.set(50, 10, 0.0);

leftForearmHandler = new THREE.Object3D();
leftForearmHandler.add(leftForearm);
leftForearmHandler.add(leftForearmEdges);
leftForearmHandler.position.set(150,0.0,0.0);

leftTubesHandler = new THREE.Object3D();
leftTubesHandler.add(leftTubes);
leftTubesHandler.add(leftTubeEdges);

leftTubesHandler.position.set(-60,25,0.0);
leftTubesHandler.rotation.z = Math.PI / 2;



var leftArmGeom = new THREE.BoxGeometry(130,30,30);

leftArm = new THREE.Mesh(leftArmGeom);

const leftArmEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(leftArmGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

leftArmHandler = new THREE.Object3D();
leftArmHandler.add(leftArm);
leftArmHandler.add(leftArmEdges);

//add handlers to left arm
leftArmHandler.add(leftTubesHandler);
leftArmHandler.add(leftForearmHandler);

//tube rotation to the back of the arm
leftArmHandler.rotation.y = Math.PI / 2;

//rotate the arm in the correct position
leftArmHandler.rotation.z = Math.PI / (-2);
leftArmHandler.position.set(-50,0.0,0.0);

//-----RIGHT ARM-----

var rightArmHandler, rightForearmHandler, rightArm, rightTubes, rightForearm, rightTubesHandler;

var rightForearmGeom = new THREE.BoxGeometry(160, 30, 30);

rightForearm = new THREE.Mesh(rightForearmGeom, new THREE.MeshBasicMaterial({color: 0xff0000}));

const rightForearmEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightForearmGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

var rightTubesGeom = new THREE.CylinderGeometry(10,10,100)

rightTubes = new THREE.Mesh(rightTubesGeom, new THREE.MeshBasicMaterial({color: 0xff0000}));

const rightTubeEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightTubesGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);


//leftTubes.position.set(50, 10, 0.0);

rightForearmHandler = new THREE.Object3D();
rightForearmHandler.add(rightForearm);
rightForearmHandler.add(rightForearmEdges);
rightForearmHandler.position.set(150,0.0,0.0);

rightTubesHandler = new THREE.Object3D();
rightTubesHandler.add(rightTubes);
rightTubesHandler.add(rightTubeEdges);

rightTubesHandler.position.set(-60,25,0.0);
rightTubesHandler.rotation.z = Math.PI / 2;



var rightArmGeom = new THREE.BoxGeometry(130,30,30);

rightArm = new THREE.Mesh(rightArmGeom);

const rightArmEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(rightArmGeom),
    new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
    })
);

rightArmHandler = new THREE.Object3D();
rightArmHandler.add(rightArm);
rightArmHandler.add(rightArmEdges);

//add handlers to left arm
rightArmHandler.add(rightTubesHandler);
rightArmHandler.add(rightForearmHandler);

//tube rotation to the back of the arm
rightArmHandler.rotation.y = Math.PI / 2;

//rotate the arm in the correct position
rightArmHandler.rotation.z = Math.PI / (-2);
rightArmHandler.position.set(80,0.0,0.0)

export default {
    leftArm: leftArmHandler,
    rightArm: rightArmHandler,
}


