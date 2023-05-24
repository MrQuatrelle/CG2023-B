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

    #positionOffset;

    constructor() {
        super();
        this.#head = new head.Head();
        this.#head.position.set(0, 40, 60);

        this.#body = new body.Body();

        this.#leftLeg = new legs.Leg();
        this.#leftFoot = this.#leftLeg.getFoot();
        this.#leftFoot.translateX(10);
        this.#leftLeg.position.set(30, -110, 0);
        this.#leftLeg.isLeft();

        this.#rightLeg = new legs.Leg();
        this.#rightFoot = this.#rightLeg.getFoot();
        this.#rightFoot.translateX(-10);
        this.#rightLeg.position.set(-30, -110, 0);
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
        this.position.set(110, 370, 280);
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

    moveFeetUp() {
        if (this.#leftFoot.rotation.x < Math.PI / 2) {
            this.#leftFoot.rotateX(Math.PI / 64);
            this.#rightFoot.rotateX(Math.PI / 64);
            this.#updateHeight();
        }
        /*else (sumconditionaboutlimits) {
            this.#leftFoot.translateY(1);
            this.#rightFoot.translateY(1);
        }*/
    }

    moveFeetDown() {
        if (this.#leftFoot.rotation.x > 0) {
            this.#leftFoot.rotateX(-(Math.PI / 64));
            this.#rightFoot.rotateX(-(Math.PI / 64));
            this.#updateHeight();
        }
    }
    rotateHeadUp() {
        if (this.#head.rotation.x < 0) {
            this.#head.rotateX(Math.PI / 64);

        }
    }
    rotateHeadDown() {
        if (this.#head.rotation.x > -Math.PI / 2) {
            this.#head.rotateX(-Math.PI / 64);
        }
    }

    rotateLegsUp() {
        if (this.#leftLeg.rotation.x < Math.PI / 2) {
            this.#leftLeg.rotateX(Math.PI / 64);
            this.#rightLeg.rotateX(Math.PI / 64);
            this.#updateHeight();
        }
        console.log("[INFO] height = ", this.position.x);
    }

    rotateLegsDown() {
        if (this.#leftLeg.rotation.x > 0) {
            this.#leftLeg.rotateX(-Math.PI / 64);
            this.#rightLeg.rotateX(-Math.PI / 64);
            this.#updateHeight();
        }
    }

    #updateHeight() {
        var footOffset = Math.sin(this.#leftFoot.rotation.x +
            this.#leftLeg.rotation.x) * 80; // 80 = foot length
        footOffset += Math.cos(this.#leftFoot.rotation.x +
            this.#leftLeg.rotation.x) * 20; // 80 = foot length
        const legOffset = Math.cos(this.#leftLeg.rotation.x) * 240; // 340 = leg length
        const offset = Math.max(footOffset + legOffset + 110, 165);
        console.log("[INFO] offset = ", offset);
        this.position.y = offset;
    }
}

export default {
    Robot: Robot
}
