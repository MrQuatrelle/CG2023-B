import * as THREE from "three";
import body from "./body.js"
import arm from "./braco.js"
import legs from "./legs.js"
import head from "./head.js"


class Robot extends THREE.Object3D {
    #body;

    #head;

    #leftLeg;
    #rightLeg;

    #leftFoot;
    #rightFoot;

    #leftArm;
    #rightArm;

    #headState;
    #legState;
    #feetState;
    #armsState;
    #moving;

    #truck;

    hitboxHelper;
    hitbox;
    towPoint;

    constructor() {
        super();
        this.#head = new head.Head();
        this.#head.position.set(0, 40, 60);

        this.#body = new body.Body();

        this.#leftLeg = new legs.Leg();
        this.#leftLeg.isLeft();
        this.#leftLeg.position.set(30, -110, 0);
        this.#rightLeg = new legs.Leg();
        this.#rightLeg.isRight();
        this.#rightLeg.position.set(-30, -110, 0);

        this.#leftFoot = this.#leftLeg.getFoot();
        this.#leftFoot.translateX(10);
        this.#rightFoot = this.#rightLeg.getFoot();
        this.#rightFoot.translateX(-10);

        this.#rightArm = new arm.Arm();
        this.#rightArm.position.set(-95, -25, -35);
        this.#leftArm = new arm.Arm();
        this.#leftArm.position.set(95, -25, -35);

        this.#headState = new stillState();
        this.#legState = new stillState();
        this.#feetState = new stillState();
        this.#armsState = new stillState();
        this.#moving = 0;

        this.#truck = false;

        this.towPoint = new THREE.Object3D();
        this.towPoint.position.set(0, -110, -160);

        this.add(this.#body, this.#head,
            this.#leftLeg, this.#rightLeg,
            this.#leftArm, this.#rightArm,
            this.towPoint);

        this.hitbox = new THREE.Box3();
        // TODO: Remove this in the end!
        this.hitboxHelper = new THREE.Box3Helper(this.hitbox, { color: 0xff0000 });
        this.reset();
    }

    move() {
        this.#feetState.move(this);
        this.#legState.move(this);
        this.#headState.move(this);
        this.#armsState.move(this);

        if (this.#moving)
            this.#updateHeight();
    }

    moveFeetDown() {
        if (!this.#feetState.isMoving) {
            console.log("[INFO]: moving feet down");
            this.#feetState = new feetDownState();
            this.#moving++;
        }
    }

    moveFeetUp() {
        if (!this.#feetState.isMoving) {
            console.log("[INFO]: moving feet up");
            this.#feetState = new feetUpState();
            this.#moving++;
        }
    }

    stopFeet() {
        if (this.#feetState.isMoving) {
            this.#feetState = new stillState();
            this.#moving--;
        }
    }

    moveLegsDown() {
        if (!this.#legState.isMoving) {
            console.log("[INFO]: moving legs down");
            this.#legState = new legsDownState();
            this.#moving++;
        }
    }

    moveLegsUp() {
        if (!this.#legState.isMoving) {
            console.log("[INFO]: moving legs up");
            this.#legState = new legsUpState();
            this.#moving++;
        }
    }

    stopLegs() {
        if (this.#legState.isMoving) {
            this.#legState = new stillState();
            this.#moving--;
        }
    }

    moveHeadDown() {
        if (!this.#headState.isMoving) {
            console.log("[INFO]: moving head down");
            this.#headState = new headDownState();
            this.#moving++;
        }
    }

    moveHeadUp() {
        if (!this.#headState.isMoving) {
            console.log("[INFO]: moving head up");
            this.#headState = new headUpState();
            this.#moving++;
        }
    }

    stopHead() {
        if (this.#headState.isMoving) {
            this.#headState = new stillState();
            this.#moving--;
        }
    }

    moveArmsInwards() {
        if (!this.#armsState.isMoving) {
            console.log("[INFO]: moving arms inwards");
            this.#armsState = new armsInwardsState();
            this.#moving++;
        }
    }

    moveArmsOutwards() {
        if (!this.#armsState.isMoving) {
            console.log("[INFO]: moving arms outwards");
            this.#armsState = new armsOutwardsState();
            this.#moving++;
        }
    }

    stopArms() {
        if (this.#armsState.isMoving) {
            this.#armsState = new stillState();
            this.#moving--;
        }
    }

    /**
    * toggles on/off the wiref_r_ame of the whole robot.
    */
    toggleWireframe() {
        this.parent.traverse((c) => {
            if (c.isMesh) {
                c.material.wireframe = !(c.material.wireframe);
                c.material.needsUpdate = true;
            }
        });
    }

    getLeftArm() {
        return this.#leftArm;
    }

    getRightArm() {
        return this.#rightArm;
    }

    getLeftLeg() {
        return this.#leftLeg;
    }

    getRightLeg() {
        return this.#rightLeg;
    }

    getLeftFoot() {
        return this.#leftFoot;
    }

    getRightFoot() {
        return this.#rightFoot;
    }

    getHead() {
        return this.#head;
    }

    // BUG: are this methods even worth it?
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
    // !comment

    reset() {
        this.position.set(110, 370, 280);
        this.#updateHeight();
    }

    #updateHeight() {
        var footOffset = Math.sin(this.#leftFoot.rotation.x +
            this.#leftLeg.rotation.x) * 80; // 80 = foot length
        footOffset += Math.cos(this.#leftFoot.rotation.x +
            this.#leftLeg.rotation.x) * 20; // 80 = foot length
        const legOffset = Math.cos(this.#leftLeg.rotation.x) * 240; // 340 = leg length
        const offset = Math.max(footOffset + legOffset + 110, 165);
        this.position.y = offset;
        this.hitbox.setFromObject(this);
        this.#updateStatus();
    }

    #updateStatus() {
        if (this.getLeftArmPositionZ() == -65 &&
            this.getLeftArmPositionX() == 65 &&
            this.#leftFoot.rotation.x > (Math.PI / 2) &&
            this.#head.rotation.x < -Math.PI / 2 &&
            this.#leftLeg.rotation.x > Math.PI / 2) {
            this.#truck = true;
            console.log("[INFO]: robot form: truck");
        }
        else {
            this.#truck = false;
        }
    }

    /**
    * returns if robot is in truck form or not.
    * @type boolean
    */
    isTruck() {
        return this.#truck;
    }
}

class stillState {
    constructor() { }

    move(robot) {
        // do nothing
    }
}

class armsOutwardsState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= 30 * 2;
        if (robot.getLeftArmPositionX() < 95) {
            delta = Math.min(delta, 95 - robot.getLeftArmPositionX());
            robot.getLeftArm().translateX(delta);
            robot.getRightArm().translateX(-delta);
        }
        else if (robot.getLeftArmPositionZ() < -35) {
            delta = Math.min(delta, -(robot.getLeftArmPositionZ() + 35));
            robot.getLeftArm().translateZ(delta);
            robot.getRightArm().translateZ(delta);
        }
    }
}

class armsInwardsState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= 30 * 2;
        if (robot.getLeftArmPositionZ() > -65) {
            delta = Math.min(delta, robot.getLeftArmPositionZ() + 65);
            robot.getLeftArm().translateZ(-delta);
            robot.getRightArm().translateZ(-delta);
        }
        else if (robot.getLeftArmPositionX() > 65) {
            delta = Math.min(delta, robot.getLeftArmPositionX() - 65);
            robot.getLeftArm().translateX(-delta);
            robot.getRightArm().translateX(delta);
        }
    }
}

class legsDownState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, robot.getLeftLeg().rotation.x);
        robot.getLeftLeg().rotateX(-delta);
        robot.getRightLeg().rotateX(-delta);
    }
}

class legsUpState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, (Math.PI / 2) - robot.getLeftLeg().rotation.x);
        robot.getLeftLeg().rotateX(delta);
        robot.getRightLeg().rotateX(delta);
    }
}

class feetUpState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, (Math.PI / 2) - robot.getLeftFoot().rotation.x);
        robot.getLeftFoot().rotateX(delta);
        robot.getRightFoot().rotateX(delta);
    }
}

class feetDownState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, robot.getLeftFoot().rotation.x);
        robot.getLeftFoot().rotateX(-delta);
        robot.getRightFoot().rotateX(-delta);
    }
}

// Head classes for State Design Pattern

class headUpState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, - robot.getHead().rotation.x);
        robot.getHead().rotateX(delta);
    }
}

class headDownState {
    isMoving = true;
    #clock;

    constructor() {
        this.#clock = new THREE.Clock();
        this.#clock.start();
    }

    move(robot) {
        let delta = this.#clock.getDelta();
        delta *= (Math.PI / 2);
        delta = Math.min(delta, (Math.PI / 2) + robot.getHead().rotation.x);
        robot.getHead().rotateX(-delta);
    }
}

export default {
    Robot: Robot
}
