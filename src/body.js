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

    #generateChest() {
        //Front part of chest
        const chestMeshGeo1 = new THREE.BoxGeometry(160, 81, 130);
        const chestMesh1 = new THREE.Mesh(chestMeshGeo1,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));
        chestMesh1.position.set(0, 0, 15)

        //Back part of chest
        const chestMeshGeo2 = new THREE.BoxGeometry(100, 81, 30);
        const chestMesh2 = new THREE.Mesh(chestMeshGeo2,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));
        chestMesh2.position.set(0, 0, -65)

        //Windows
        const windowMeshGeo = new THREE.PlaneGeometry( 60, 60);
        const windowMat = new THREE.MeshBasicMaterial({ color: 0x3A6EA5, side: THREE.DoubleSide, wireframe:false} );
        const windowMesh1 = new THREE.Mesh(windowMeshGeo, windowMat);
        const windowMesh2 = new THREE.Mesh(windowMeshGeo, windowMat);
        windowMesh1.position.set(40, 0, 80.1);
        windowMesh2.position.set(-40, 0, 80.1);
        const chest = new THREE.Object3D();
        chest.add(chestMesh1, chestMesh2, windowMesh1, windowMesh2);

        return chest;
    }

    #generateBelly() {
        const bellyGeo = new THREE.BoxGeometry(160, 50, 130);
        const bellySolid1 = new THREE.Mesh(bellyGeo,
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        bellySolid1.position.set(0, 0, 15)

        const bellyGeo2 = new THREE.BoxGeometry(100, 50, 30);
        const bellySolid2 = new THREE.Mesh(bellyGeo2,
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        bellySolid2.position.set(0, 0, -65);

        //Under part of belly
        const bellyGeo3 = new THREE.BoxGeometry(100, 30, 160);
        const bellySolid3 = new THREE.Mesh(bellyGeo3,
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        bellySolid3.position.set(0, -40, 0);

        const belly = new THREE.Object3D();
        belly.add(bellySolid1, bellySolid2, bellySolid3);

        return belly;
    }

    #generateWaist() {
        //Front part of waist
        const waistGeo1 = new THREE.BoxGeometry(160, 20, 20);
        const waistSolid1 = new THREE.Mesh(waistGeo1,
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        waistSolid1.position.set(0, 0, 70);

        //Center part of waist
        const waistGeo2 = new THREE.BoxGeometry(100, 20, 140);
        const waistSolid2 = new THREE.Mesh(waistGeo2,
            new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        waistSolid2.position.set(0, 0, -10);

        const wheel1 = new wheel.Wheel();
        wheel1.position.set(-70, -10, 25);
        const wheel2 = new wheel.Wheel();
        wheel2.position.set(70, -10, 25);

        const waist = new THREE.Object3D();
        waist.add(waistSolid1, waistSolid2, wheel1, wheel2);
        return waist;
    }
}

export default {
    Body: Body,
}
