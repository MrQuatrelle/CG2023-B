import * as THREE from "three";

const headSolidMat = new THREE.MeshBasicMaterial( { color: 0x000070});
const headLinesMat = new THREE.LineBasicMaterial( {color: 0xffffff, linewidth: 20} );


//head piece

//Main part of head
const headSolidGeo1 = new THREE.BoxGeometry(40, 40, 40);
const headSolid1 = new THREE.Mesh(headSolidGeo1,headSolidMat);
const headEdges1 = new THREE.LineSegments( headSolidGeo1, headLinesMat);
const head1 = new THREE.Object3D();
head1.add(headSolid1);
head1.add(headEdges1);
head1.position.set(80,440,120);

//Antennas
const headSolidGeo2 = new THREE.ConeGeometry(5, 20, 100);
const headSolid2 = new THREE.Mesh(headSolidGeo2,headSolidMat);
const headEdges2 = new THREE.LineSegments( headSolidGeo2, headLinesMat);
const head2 = new THREE.Object3D();
head2.add(headSolid2);
head2.add(headEdges2);
head2.position.set(105,460,105);

const head3 = new THREE.Object3D();
const headSolidGeo3= new THREE.ConeGeometry(5, 20, 100);
const headSolid3 = new THREE.Mesh(headSolidGeo3,headSolidMat);
const headEdges3 = new THREE.LineSegments( headSolidGeo3, headLinesMat);

head3.add(headSolid3);
head3.add(headEdges3);
head3.position.set(135,460,105);

const head = new THREE.Object3D();
head.add(head1);
head.add(head2);
head.add(head3);


function reset(){
	head.position.set(80,440,120);
}

function setheadPosition(x, y, z){
	head.position.x = x;
	head.position.y = y;
	head.position.z = z;
}
export default {
	head: head,
	reset: reset
}