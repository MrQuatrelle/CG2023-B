import * as THREE from "three";
import wheel from "./wheels.js";

// Materials (Chest - Lime Green, Belly - Dark Green, Waist - Light Grey)
const chestSolidMat = new THREE.MeshBasicMaterial({ color: 0x10ff10 });
const bodyLinesMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
const bellyMat = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
const waistMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });

//Chest piece

//Front part of chest
const chestSolidGeo1 = new THREE.BoxGeometry(160, 80, 130);
const chestSolid1 = new THREE.Mesh(chestSolidGeo1, chestSolidMat);
const chestEdges1 = new THREE.LineSegments(chestSolidGeo1, bodyLinesMat);
const chest1 = new THREE.Object3D();
chest1.add(chestSolid1);
chest1.add(chestEdges1);
chest1.position.set(110, 380, 95);

//Back part of chest
const chestSolidGeo2 = new THREE.BoxGeometry(100, 80, 30);
const chestSolid2 = new THREE.Mesh(chestSolidGeo2, chestSolidMat);
const chestEdges2 = new THREE.LineSegments(chestSolidGeo2, bodyLinesMat);
const chest2 = new THREE.Object3D();
chest2.add(chestSolid2);
chest2.add(chestEdges2);
chest2.position.set(110, 380, 15);


//Belly piece in 3 parts

//Front part of belly
const bellyGeo = new THREE.BoxGeometry(160, 50, 130);
const bellySolid = new THREE.Mesh(bellyGeo, bellyMat);
const bellyEdges = new THREE.LineSegments(bellyGeo, bodyLinesMat);
const belly1 = new THREE.Object3D();
belly1.add(bellySolid);
belly1.add(bellyEdges);
belly1.position.set(110, 315, 95);

//Back part of belly
const bellyGeo2 = new THREE.BoxGeometry(100, 50, 30);
const bellySolid2 = new THREE.Mesh(bellyGeo2, bellyMat);
const bellyEdges2 = new THREE.LineSegments(bellyGeo2, bodyLinesMat);
const belly2 = new THREE.Object3D();
belly2.add(bellySolid2);
belly2.add(bellyEdges2);
belly2.position.set(110, 315, 15);


//Under part of belly
const bellyGeo3 = new THREE.BoxGeometry(100, 30, 160);
const bellySolid3 = new THREE.Mesh(bellyGeo3, bellyMat);
const bellyEdges3 = new THREE.LineSegments(bellyGeo3, bodyLinesMat);
const belly3 = new THREE.Object3D();
belly3.add(bellySolid3);
belly3.add(bellyEdges3);
belly3.position.set(110, 275, 80);



//Front part of waist
const waistGeo1 = new THREE.BoxGeometry(160, 20, 20);
const waistSolid1 = new THREE.Mesh(waistGeo1, waistMat);
const waistEdges1 = new THREE.LineSegments(waistGeo1, bodyLinesMat);
const waist1 = new THREE.Object3D();
waist1.add(waistSolid1);
waist1.add(waistEdges1);
waist1.position.set(110, 250, 150);

//Center part of waist
const waistGeo2 = new THREE.BoxGeometry(120, 20, 140);
const waistSolid2 = new THREE.Mesh(waistGeo2, waistMat);
const waistEdges2 = new THREE.LineSegments(waistGeo2, bodyLinesMat);
const waist2 = new THREE.Object3D();
waist2.add(waistSolid2);
waist2.add(waistEdges2);
waist2.position.set(110, 250, 70);

const wheel1 = wheel.createWheel(40, 245, 115);
const wheel2 = wheel.createWheel(180, 245, 115);

// Building body with all pieces
const body = new THREE.Object3D();

body.add(chest1);
body.add(chest2);

body.add(belly1);
body.add(belly2);
body.add(belly3);
body.add(waist1);
body.add(waist2);
body.add(wheel1);
body.add(wheel2);

function reset() {
    body.position.set(110, 380, 80);
}

function setChestPosition(x, y, z) {
    chestSolidMesh.position.x = x;
    chestSolidMesh.position.y = y;
    chestSolidMesh.position.z = z;
}

export default {
    body: body,
    reset: reset
}
