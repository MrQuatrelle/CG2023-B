import * as THREE from "three";

class Head extends THREE.Object3D {
    constructor() {
        super();
        const headLinesMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
        const head = this.#generateHead();
        const antenna1 = this.#generateAntenna();
        const antenna2 = this.#generateAntenna();
        head.position.set(0, 20, -20);
        antenna1.position.set(-15, 50, -35);
        antenna2.position.set(15, 50, -35);
        const chin = new THREE.Object3D();
        chin.add(head, antenna1, antenna2);


        this.add(chin);
    }

    #generateAntenna() {
        const antennaSolidMat = new THREE.MeshBasicMaterial({ color: 0x000769 });
        const antenna = new THREE.Object3D();
        const antennaSolidGeo = new THREE.ConeGeometry(5, 20, 100);
        const antennaSolid = new THREE.Mesh(antennaSolidGeo, antennaSolidMat);

        antenna.add(antennaSolid);
        return antenna;
    }
    #generateHead() {
        //Noggin
        const headSolidMat = new THREE.MeshBasicMaterial({ color: 0x000769 });
        const head = new THREE.Object3D();
        const headSolidGeo = new THREE.BoxGeometry(40, 40, 40);
        const headSolid = new THREE.Mesh(headSolidGeo, headSolidMat);

        //Eyes
        const eyeGeo = new THREE.CircleGeometry(5);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xEEEEEE });
        const eye1 = new THREE.Mesh(eyeGeo, eyeMat);
        const eye2 = new THREE.Mesh(eyeGeo, eyeMat);
        eye1.position.set(10, 5, 20.2)
        eye2.position.set(-10, 5, 20.2)
        //Face

        const faceGeo = new THREE.PlaneGeometry(30, 20);
        const faceMat = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
        const face = new THREE.Mesh(faceGeo, faceMat);
        face.position.set(0, -5, 20.1);

        head.add(headSolid, face, eye1, eye2);

        return head;
    }
}

export default {
    Head: Head
}
