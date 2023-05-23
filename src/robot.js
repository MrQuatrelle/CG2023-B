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

    reset() {
        this.position.set(110, 380, 80);
    }
}

export default {
    Robot: Robot
}
