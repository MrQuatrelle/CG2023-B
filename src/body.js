import * as THREE from "three";

const chestSolidGeo = new THREE.BoxGeometry(160, 80, 160);
const chestSolidMesh = new THREE.MeshBasicMaterial( { color: 0x10ff10, wireframe: true});

const chestSolid = new THREE.Mesh(chestSolidGeo,chestSolidMesh);

const chestLinesMat = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 2} );
const chestEdges = new THREE.LineSegments( chestSolidGeo, chestSolidMesh);

const chest = new THREE.Object3D();
chest.add(chestSolid);
chest.add(chestEdges);

function reset(){
	chestSolidMesh.position.reset(110,380,110);
}
function setChestPosition(x, y, z){
	chestSolidMesh.position.x = x;
	chestSolidMesh.position.y = y;
	chestSolidMesh.position.z = z;
}

export default {
	body: chest
}