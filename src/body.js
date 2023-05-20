import * as THREE from "three";

const chestSolid = new THREE.Mesh(

	chestSolidGeo = new THREE.BoxGeometry(160, 80, 160),
	chestSolidMesh = new THREE.MeshBasicMaterial( { color: 0x10ff10, wireframe: true}),
	reset()
);

function reset(){
	chestSolidMesh.position.reset(110,380,110);
}
function setChestPosition(x, y, z){
	chestSolidMesh.position.x = x;
	chestSolidMesh.position.y = y;
	chestSolidMesh.position.z = z;
}

export default {
	raw: chestSolid,
	setChestPosition: setChestPosition,
}