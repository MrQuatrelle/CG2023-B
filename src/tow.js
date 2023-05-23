import * as THREE from "three";
import wheel from "./wheels.js";


class Tow extends THREE.Object3D {
    constructor() {
        super();

        const box = this.#generateBox();

        const support = this.#generateSupport();
        support.position.set(0, -100, -160);

        const wheel1 = new wheel.Wheel();
        wheel1.position.set(70, -15, -50);

        const wheel2 = new wheel.Wheel();
        wheel2.position.set(-70, -15, -50);

        const wheel3 = new wheel.Wheel();
        wheel3.position.set(70, -15, 50);

        const wheel4 = new wheel.Wheel();
        wheel4.position.set(-70, -15, 50);

        support.add(wheel1, wheel2, wheel3, wheel4);

        this.add(box, support);
    }

    #generateBox() {
        const geom = new THREE.BoxGeometry(160, 160, 480);
        const mesh = new THREE.Mesh(
            geom,
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            })
        );
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 2,
            })
        );

        const result = new THREE.Object3D();
        result.add(mesh, edges);

        return result;
    }

    #generateSupport() {
        const geom = new THREE.BoxGeometry(120, 40, 160);
        const mesh = new THREE.Mesh(
            geom,
            new THREE.MeshBasicMaterial({
                color: 0x00ff00
            })
        );
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 2,
            })
        );

        const result = new THREE.Object3D();
        result.add(mesh, edges);

        return result;
    }
}


export default {
    Tow: Tow,
}
