import * as THREE from "three";
import wheel from "./wheels.js";
import head from "./head.js";
import legs from "./legs.js";
import arm from "./braco.js";


class Body extends THREE.Object3D {

    constructor() {
        super();
        const bodyLinesMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });

        const chest = this.#generateChest(bodyLinesMat);
        const belly = this.#generateBelly(bodyLinesMat);
        belly.position.set(0, -65, 0);

        const waist = this.#generateWaist(bodyLinesMat);
        waist.position.set(0, -130, 0);


        this.add(chest, belly, waist);
    }

    #generateChest(bodyLinesMat) {
        const chestMeshMat = new THREE.MeshBasicMaterial({ color: 0x10ff10 });
        //Front part of chest
        const chestMeshGeo1 = new THREE.BoxGeometry(160, 80, 130);
        const chestMesh1 = new THREE.Mesh(chestMeshGeo1, chestMeshMat);
        const chestEdges1 = new THREE.LineSegments(chestMeshGeo1, bodyLinesMat);
        const chest1 = new THREE.Object3D();
        chest1.add(chestMesh1, chestEdges1);
        chest1.position.set(0, 0, 15)

        //Back part of chest
        const chestMeshGeo2 = new THREE.BoxGeometry(100, 80, 30);
        const chestMesh2 = new THREE.Mesh(chestMeshGeo2, chestMeshMat);
        const chestEdges2 = new THREE.LineSegments(chestMeshGeo2, bodyLinesMat);
        const chest2 = new THREE.Object3D();
        chest2.add(chestMesh2, chestEdges2);
        chest2.position.set(0, 0, -65)

        const chest = new THREE.Object3D();
        chest.add(chest1, chest2);

        return chest;
    }

    #generateBelly(bodyLinesMat) {
        const bellyMat = new THREE.MeshBasicMaterial({ color: 0x00aa00 });

        const bellyGeo = new THREE.BoxGeometry(160, 50, 130);
        const bellySolid = new THREE.Mesh(bellyGeo, bellyMat);
        const bellyEdges = new THREE.LineSegments(bellyGeo, bodyLinesMat);
        const belly1 = new THREE.Object3D();

        belly1.add(bellySolid);
        belly1.add(bellyEdges);
        belly1.position.set(0, 0, 15)

        const bellyGeo2 = new THREE.BoxGeometry(100, 50, 30);
        const bellySolid2 = new THREE.Mesh(bellyGeo2, bellyMat);
        const bellyEdges2 = new THREE.LineSegments(bellyGeo2, bodyLinesMat);
        const belly2 = new THREE.Object3D();

        belly2.add(bellySolid2);
        belly2.add(bellyEdges2);
        belly2.position.set(0, 0, -65);

        //Under part of belly
        const bellyGeo3 = new THREE.BoxGeometry(100, 30, 160);
        const bellySolid3 = new THREE.Mesh(bellyGeo3, bellyMat);
        const bellyEdges3 = new THREE.LineSegments(bellyGeo3, bodyLinesMat);
        const belly3 = new THREE.Object3D();
        belly3.add(bellySolid3);
        belly3.add(bellyEdges3);
        belly3.position.set(0, -40, 0);

        const belly = new THREE.Object3D();
        belly.add(belly1, belly2, belly3);

        return belly;
    }

    #generateWaist(bodyLinesMat) {
        const waistMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        //Front part of waist
        const waistGeo1 = new THREE.BoxGeometry(160, 20, 20);
        const waistSolid1 = new THREE.Mesh(waistGeo1, waistMat);
        const waistEdges1 = new THREE.LineSegments(waistGeo1, bodyLinesMat);
        const waist1 = new THREE.Object3D();
        waist1.add(waistSolid1);
        waist1.add(waistEdges1);
        waist1.position.set(0, 0, 70);

        //Center part of waist
        const waistGeo2 = new THREE.BoxGeometry(100, 20, 140);
        const waistSolid2 = new THREE.Mesh(waistGeo2, waistMat);
        const waistEdges2 = new THREE.LineSegments(waistGeo2, bodyLinesMat);
        const waist2 = new THREE.Object3D();
        waist2.add(waistSolid2);
        waist2.add(waistEdges2);
        waist2.position.set(0, 0, -10);

        const wheel1 = new wheel.Wheel();
        wheel1.position.set(-70, -5, 30);
        const wheel2 = new wheel.Wheel();
        wheel2.position.set(70, -5, 30);

        const waist = new THREE.Object3D();
        waist.add(waist1, waist2, wheel1, wheel2);
        return waist;
    }


}

export default {
    Body: Body,
}
