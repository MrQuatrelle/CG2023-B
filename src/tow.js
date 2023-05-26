import * as THREE from "three";
import wheel from "./wheels.js";


class Tow extends THREE.Object3D {
    towPoint;
    hitbox;
    hitboxHelper;

    #leftState;
    #downState;
    #rightState;
    #upState;
    #towingState;

    #plugged;

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
        this.hitbox.setFromObject(this);

        this.#leftState = new stillState();
        this.#downState = new stillState();
        this.#upState = new stillState();
        this.#rightState = new stillState();
        this.#towingState = new stillState();
        this.#plugged = false;

        this.position.set(110, 135, -300);
    }

    /**
    * @param connection point (THREE.Vector3 to which this' towPoint has to
    *        move to
    */
    plugInto(connection) {
        if (connection.isVector3) {
            this.#towingState = new moveToTruckState(connection);

            this.#plugged = true;
        }
    }

    isTowed() {
        return this.#plugged;
    }

    isTowing() {
        return this.#towingState instanceof moveToTruckState;
    }

    #generateBox() {
        const geom = new THREE.BoxGeometry(160, 160, 480);
        const mesh = new THREE.Mesh(
            geom,
            new THREE.MeshBasicMaterial({
                color: 0xaaaaaa
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
                color: 0x000769
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

    move() {
        if (!this.#plugged) {
            this.#leftState.move(this);
            this.#downState.move(this);
            this.#upState.move(this);
            this.#rightState.move(this);
        }
        if (this.#towingState.move(this)) {
            console.log("done");
            this.#towingState = new stillState();
        }

        this.hitbox.setFromObject(this);
    }

    moveLeft() {
        if (!this.#leftState.isMoving) {
            this.#leftState = new moveLeftState();
        }
    }

    stopLeft() {
        if (this.#leftState.isMoving) {
            this.#leftState = new stillState();
        }
    }

    moveDown() {
        if (!this.#downState.isMoving) {
            this.#downState = new moveDownState();
        }
    }

    stopDown() {
        if (this.#downState.isMoving) {
            this.#downState = new stillState();
        }
    }

    moveUp() {
        if (!this.#upState.isMoving) {
            this.#upState = new moveUpState();
        }
    }

    stopUp() {
        if (this.#upState.isMoving) {
            this.#upState = new stillState();
        }
    }

    moveRight() {
        if (!this.#rightState.isMoving) {
            this.#rightState = new moveRightState();
        }
    }

    stopRight() {
        if (this.#rightState.isMoving) {
            this.#rightState = new stillState();
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

class moveToTruckState {
    #clock;
    isMoving = true;
    #target;

    constructor(vector) {
        this.#clock = new THREE.Clock();
        this.#clock.start();
        this.#target = vector;
    }

    move(trailer) {
        let deltaT = this.#clock.getDelta();

        let deltaS = new THREE.Vector3();
        deltaS.add(this.#target);
        deltaS.sub(trailer.position);
        deltaS.sub(trailer.towPoint.position);

        let deltaX;
        let deltaY;
        let deltaZ;

        if (deltaS.length() < 1) {
            deltaX = deltaS.x;
            deltaY = deltaS.y;
            deltaZ = deltaS.z;
        }
        else {
            deltaX = deltaT * deltaS.x;
            deltaY = deltaT * deltaS.y;
            deltaZ = deltaT * deltaS.z;
        }

        trailer.translateX(deltaX);
        trailer.translateY(deltaY);
        trailer.translateZ(deltaZ);

        if (deltaS.x == 0 && deltaS.y == 0 && deltaS.z == 0)
            return true;
        else return false;
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
