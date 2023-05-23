import * as THREE from "three";
import body from "./body.js"
import arm from "./braco.js"
import legs from "./legs.js"
import head from "./head.js"


class Robot extends THREE.Object3D {
    #body
    #head
    #leftLeg;
    #rightLeg;
    #leftFoot;
    #rightFoot;
    #leftArm;
    #rightArm;

    constructor() {
        super();
        this.#head = new head.Head();
        this.#head.position.set(0, 60, 40);

        this.#body = new body.Body();

        this.#leftLeg = new legs.Leg();
        this.#leftFoot = this.#leftLeg.getFoot();
        this.#leftFoot.translateX(10);
        this.#leftLeg.position.set(30, -120, 0);
        this.#leftLeg.isLeft();

        this.#rightLeg = new legs.Leg();
        this.#rightFoot = this.#rightLeg.getFoot();
        this.#rightFoot.translateX(-10);
        this.#rightLeg.position.set(-30, -120, 0);
        this.#rightLeg.isRight();

        this.#rightArm = new arm.Arm();
        this.#rightArm.position.set(-95, -25, -35);
        this.#leftArm = new arm.Arm();
        this.#leftArm.position.set(95, -25, -35);
        this.reset();

        this.add(this.#body, this.#head,
            this.#leftLeg, this.#rightLeg,
            this.#leftArm, this.#rightArm);
    }

    getLeftArmPositionZ() {
        return this.#leftArm.position.z;
    }

    getLeftArmPositionX() {
        return this.#leftArm.position.x;
    }

    getRightArmPositionZ() {
        return this.#rightArm.position.z;
    }

    getRightArmPositionX() {
        return this.#rightArm.position.z;
    }

    reset() {
        this.position.set(110, 380, 80);
    }

    moveArmsInwards() {
        if (this.getLeftArmPositionZ() > -65) {
            this.#leftArm.translateZ(-1);
            this.#rightArm.translateZ(-1);
        }
        else {
            if (this.getLeftArmPositionX() > 65) {
                this.#leftArm.translateX(-1);
                this.#rightArm.translateX(1);
            }
        }
    }

    moveArmsOutwards() {
        if (this.getLeftArmPositionX() < 95) {
            this.#leftArm.translateX(1);
            this.#rightArm.translateX(-1);
        }
        else {
            if (this.getLeftArmPositionZ() < -35) {
                this.#leftArm.translateZ(1);
                this.#rightArm.translateZ(1);
            }
        }
    }
}

export default {
    Robot: Robot
}
