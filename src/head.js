import * as THREE from "three";

class Head extends THREE.Object3D {

    constructor() {
        super();
        const headLinesMat = new THREE.LineBasicMaterial( {color: 0xffffff, linewidth: 1} );
        const head = this.#generateHead(headLinesMat);
        const antenna1 = this.#generateAntenna(headLinesMat);
        const antenna2 = this.#generateAntenna(headLinesMat);
        head.position.set(0,20,-20);
        antenna1.position.set(-15,50,-35);
        antenna2.position.set(15,50,-35);
        const chin = new THREE.Object3D();
        chin.add(head, antenna1, antenna2);


        this.add(chin);
    }
    #generateAntenna(headLinesMat){
        const antennaSolidMat = new THREE.MeshBasicMaterial( { color: 0x000769});
        const antenna = new THREE.Object3D();
        const antennaSolidGeo= new THREE.ConeGeometry(5, 20, 100);
        const antennaSolid = new THREE.Mesh(antennaSolidGeo,antennaSolidMat);
        //const antennaEdges = new THREE.LineSegments(antennaSolidGeo, headLinesMat);

        antenna.add(antennaSolid);
        //antenna.add(antennaEdges);
        return antenna;
    }
    #generateHead(headLinesMat){
        const headSolidMat = new THREE.MeshBasicMaterial( { color: 0x000769});
        const head = new THREE.Object3D();
        const headSolidGeo = new THREE.BoxGeometry(40, 40, 40);
        const headSolid = new THREE.Mesh(headSolidGeo,headSolidMat);
        const headEdges = new THREE.LineSegments(headSolidGeo, headLinesMat);
        head.add(headSolid);
        head.add(headEdges);
        return head;
    }
}

export default {
	Head: Head
}
