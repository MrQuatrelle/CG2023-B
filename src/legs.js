import * as THREE from "three";
import feet from "./feet.js";
import wheels from "./wheels.js";

class Leg extends THREE.Object3D {
    #foot;
    #topWheel;
    #bottomWheel;

    constructor() {
        super();

        const leg = this.#generateLeg();
        leg.position.set(0, -160, 20);

        const thy = this.#generateThy();
        thy.position.set(0, -40, 10);

        this.#foot = new feet.Foot();
        this.#foot.position.set(0, -240, 0);

        this.#topWheel = new wheels.Wheel();
        this.#topWheel.position.set(0, -125, 30);

        this.#bottomWheel = new wheels.Wheel()
        this.#bottomWheel.position.set(0, -195, 30);

        this.add(leg, thy, this.#foot, this.#topWheel, this.#bottomWheel);
    }

    #generateLeg() {
        const legGeom = new THREE.BoxGeometry(60, 160, 40);
        const legMesh = new THREE.Mesh(
            legGeom,
            new THREE.MeshBasicMaterial({
                color: 0x000769
            })
        );

        const leg = new THREE.Object3D();
        leg.add(legMesh);

        return leg;
    }

    #generateThy() {
        const thyGeom = new THREE.BoxGeometry(20, 80, 20);
        const thyMesh = new THREE.Mesh(
            thyGeom,
            new THREE.MeshBasicMaterial({
                color: 0xbbbbbb
            })
        );

        const thy = new THREE.Object3D();
        thy.add(thyMesh);

        return thy;
    }

    getFoot() {
        return this.#foot;
    }

    isLeft() {
        this.#topWheel.translateY(-40);
        this.#bottomWheel.translateY(-40);
    }

    isRight() {
        this.#topWheel.translateY(40);
        this.#bottomWheel.translateY(40);
    }
}

export default {
    Leg: Leg,
}
