import * as THREE from "three";

class Arm extends THREE.Object3D {

    constructor() {
        super();
        const arm = this.#generateArm();
        const forearm = this.#generateForearm();
        const tube = this.#generateTube();
        forearm.position.set(0, -80, 65);
        tube.position.set(0, 65, -20)
        this.add(arm, forearm, tube);
    }

    #generateArm() {
        const armGeom = new THREE.BoxGeometry(30, 130, 30);
        const arm = new THREE.Mesh(armGeom,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));
        const armHandler = new THREE.Object3D();
        armHandler.add(arm);
        return armHandler;
    }

    #generateForearm() {
        const forearmGeom1 = new THREE.BoxGeometry(30, 30, 80);
        const forearmGeom2 = new THREE.BoxGeometry(30, 15, 50);
        const forearmGeom3 = new THREE.BoxGeometry(30, 30, 30);

        const forearm1 = new THREE.Mesh(forearmGeom1,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));

        const forearm2 = new THREE.Mesh(forearmGeom2,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));

        const forearm3 = new THREE.Mesh(forearmGeom3,
            new THREE.MeshBasicMaterial({ color: 0x920000 }));

        const forearmObj1 = new THREE.Object3D();
        forearmObj1.add(forearm1);
        forearmObj1.position.set(0, 0, -40)

        const forearmObj2 = new THREE.Object3D();
        forearmObj2.add(forearm2);
        forearmObj2.position.set(0, 7.5, 25)

        const forearmObj3 = new THREE.Object3D();
        forearmObj3.add(forearm3);
        forearmObj3.position.set(0, 0, 65)

        const forearmHandler = new THREE.Object3D();
        forearmHandler.add(forearmObj1, forearmObj2, forearmObj3);

        return forearmHandler;
    }

    #generateTube() {
        const tubeGeom = new THREE.CylinderGeometry(10, 10, 80, 20);
        const tube = new THREE.Mesh(
            tubeGeom,
            new THREE.MeshBasicMaterial({ color: 0xAAAAAA }));

        const tubeHandler = new THREE.Object3D();
        tubeHandler.add(tube);
        return tubeHandler;
    }
}

export default {
    Arm: Arm
}
