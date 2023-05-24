import * as THREE from "three";
import wheel from "./wheels.js";


class Tow extends THREE.Object3D {
    towPoint;
    hitbox;
    hitboxHelper;
    #watchTarget;

    constructor() {
        super();

        const box = this.#generateBox();

        const support = this.#generateSupport();
        support.position.set(0, -100, -160);

        const wheel1 = new wheel.Wheel();
        wheel1.position.set(70, -10, -50);

        const wheel2 = new wheel.Wheel();
        wheel2.position.set(-70, -10, -50);

        const wheel3 = new wheel.Wheel();
        wheel3.position.set(70, -10, 50);

        const wheel4 = new wheel.Wheel();
        wheel4.position.set(-70, -10, 50);

        support.add(wheel1, wheel2, wheel3, wheel4);

        // TODO: remove this (debugging towing)
        const buffer = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        buffer.position.set(0, -80, 190);

        this.towPoint = new THREE.Object3D();
        this.towPoint.position.set(0, -80, 190);

        this.add(box, support, buffer, this.towPoint);

        this.hitbox = new THREE.Box3(this);
        this.hitboxHelper = new THREE.BoxHelper(this);
        this.hitboxHelper.update();
    }

    plugInto(connection) {
        // TODO: add annimations here
        if (connection.isVector3) {
            let diff = new THREE.Vector3()
            diff.add(connection);
            diff.sub(this.position);
            diff.sub(this.towPoint.position);

            this.translateX(diff.x);
            this.translateY(diff.y);
            this.translateZ(diff.z);
        }
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
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

    watch(target) {
        this.#watchTarget = target;
    }

    checkCollision() {
        console.log(this.hitbox.intersectsBox(this.#watchTarget));
    }

    moveLeft() {
        this.translateZ(5);
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
        this.checkCollision();
    }

    moveDown() {
        this.translateX(5);
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
        this.checkCollision();
    }

    moveUp() {
        this.translateX(-5);
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
        this.checkCollision();
    }

    moveRight() {
        this.translateZ(-5);
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
        this.checkCollision();
    }
}


export default {
    Tow: Tow,
}
