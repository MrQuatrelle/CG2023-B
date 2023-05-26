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
        const wheelEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(wheelGeom),
            new THREE.LineBasicMaterial({
                color: 0xffffff,
                linewidth: 2,
            })
        );

        this.add(wheelMesh);
        this.add(wheelEdges);

        this.rotateZ(Math.PI / 2);
    }
}

export default {
    Wheel: Wheel,
}
