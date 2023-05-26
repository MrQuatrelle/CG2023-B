import * as THREE from "three";
import wheel from "./wheels.js";


class Tow extends THREE.Object3D {
    towPoint;
    hitbox;
    hitboxHelper;
    #watchTarget;

    #leftState;
    #downState;
    #rightState;
    #upState;
    #moving;

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

        this.towPoint = new THREE.Object3D();
        this.towPoint.position.set(0, -80, 190);

        this.add(box, support, this.towPoint);

        this.hitbox = new THREE.Box3();
        // TODO: Remove this in the end
        this.hitboxHelper = new THREE.Box3Helper(this.hitbox, { color: 0xff0000 });

        this.#leftState = new stillState();
        this.#downState = new stillState();
        this.#upState = new stillState();
        this.#rightState = new stillState();
        this.#moving = 0;
    }

    /**
    * @param connection point (THREE.Vector3 to which this' towPoint has to
    *        move to
    */
    plugInto(connection) {
        // TODO: add annimations here. connection is a THREE.Vector3 with the
        // coordinates where the trailer's towPoint has to go to.

        if (connection.isVector3) {
            let diff = new THREE.Vector3()
            // has to be as scuffed as this, yes...
            diff.add(connection);
            diff.sub(this.position);
            diff.sub(this.towPoint.position);

            this.translateX(diff.x);
            this.translateY(diff.y);
            this.translateZ(diff.z);
        }

        this.hitbox.setFromObject(this);
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

    /**
    * @param the hitbox to check collisions with while this moves
    */
    watch(target) {
        this.#watchTarget = target;
    }

    checkCollision() {
        this.hitbox.setFromObject(this);
        console.log(this.hitbox.intersectsBox(this.#watchTarget));
    }

    move() {
        this.#leftState.move(this);
        this.#downState.move(this);
        this.#upState.move(this);
        this.#rightState.move(this);

        if (this.#moving)
            this.checkCollision();
    }

    moveLeft() {
        if (!this.#leftState.isMoving) {
            this.#leftState = new moveLeftState();
            this.#moving++;
        }
    }

    stopLeft() {
        if (this.#leftState.isMoving) {
            this.#leftState = new stillState();
            this.#moving--;
        }
    }

    moveDown() {
        if (!this.#downState.isMoving) {
            this.#downState = new moveDownState();
            this.#moving++;
        }
    }

    stopDown() {
        if (this.#downState.isMoving) {
            this.#downState = new stillState();
            this.#moving--;
        }
    }

    moveUp() {
        if (!this.#upState.isMoving) {
            this.#upState = new moveUpState();
            this.#moving++;
        }
    }

    stopUp() {
        if (this.#upState.isMoving) {
            this.#upState = new stillState();
            this.#moving--;
        }
    }

    moveRight() {
        if (!this.#rightState.isMoving) {
            this.#rightState = new moveRightState();
            this.#moving++;
        }
    }

    stopRight() {
        if (this.#rightState.isMoving) {
            this.#rightState = new stillState();
            this.#moving--;
        }
    }
}

class moveRightState {
    #clock;
    isMoving = true;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(trailer) {
        let delta = this.#clock.getDelta();
        delta *= 60;
        trailer.translateZ(-delta);
    }
}

class moveLeftState {
    #clock;
    isMoving = true;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(trailer) {
        let delta = this.#clock.getDelta();
        delta *= 60;
        trailer.translateZ(delta);
    }
}

class moveUpState {
    #clock;
    isMoving = true;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(trailer) {
        let delta = this.#clock.getDelta();
        delta *= 60;
        trailer.translateX(-delta);
    }
}

class moveDownState {
    #clock;
    isMoving = true;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(trailer) {
        let delta = this.#clock.getDelta();
        delta *= 60;
        trailer.translateX(delta);
    }
}

class stillState {
    constructor() { }

    move(trailer) {
        // do nothing
    }
}

export default {
    Tow: Tow,
}
