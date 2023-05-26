import * as THREE from "three";

class Foot extends THREE.Object3D {
    constructor() {
        super();

        const buffer = new THREE.Object3D();
        const footGeom = new THREE.BoxGeometry(80, 20, 80);
        const footMesh = new THREE.Mesh(
            footGeom,
            new THREE.MeshBasicMaterial({
                color: 0x000769
            })
        );

        buffer.add(footMesh);
        buffer.position.set(0, -10, 40);

        this.add(buffer);
    }
}

export default {
    Foot: Foot,
}

