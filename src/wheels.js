import * as THREE from "three";

class Wheel extends THREE.Object3D {
    constructor() {
        super();

        const wheelGeom = new THREE.CylinderGeometry(25, 25, 20);
        const wheelMesh = new THREE.Mesh(
            wheelGeom,
            new THREE.MeshBasicMaterial({
                color: 0x000000
            })
        );

        this.add(wheelMesh);

        this.rotateZ(Math.PI / 2);
    }
}

export default {
    Wheel: Wheel,
}
