import * as THREE from "three";

class Foot extends THREE.Object3D {
    constructor() {
        super();

        const buffer = new THREE.Object3D();
        const footGeom = new THREE.BoxGeometry(80, 20, 80);
        const footMesh = new THREE.Mesh(
            footGeom,
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            })
        );
        const footEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(footGeom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 1.5,
            })
        );

        buffer.add(footMesh);
        buffer.add(footEdges);
        buffer.position.set(0, -10, 40);

        this.add(buffer);
    }
}

export default {
    Foot: Foot,
}

