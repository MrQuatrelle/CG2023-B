import * as THREE from "three";
import body from "./body.js"
import arm from "./braco.js"
import legs from "./legs.js"
import head from "./head.js"


class Robot extends THREE.Object3D {
    #body;

    #head;
    #headState;

    #leftLeg;
    #rightLeg;
    #legState;

    #leftFoot;
    #rightFoot;
    #feetState;

    #leftArm;
    #rightArm;

    #truck;

    hitboxHelper;
    hitbox;
    towPoint;

    constructor() {
        super();
        this.#head = new head.Head();
        this.#head.position.set(0, 40, 60);
        this.#headState = new headStillState();

        this.#body = new body.Body();

        this.#leftLeg = new legs.Leg();
        this.#leftLeg.isLeft();
        this.#leftLeg.position.set(30, -110, 0);
        this.#rightLeg = new legs.Leg();
        this.#rightLeg.isRight();
        this.#rightLeg.position.set(-30, -110, 0);
        this.#legState = new legsStillState();

        this.#leftFoot = this.#leftLeg.getFoot();
        this.#leftFoot.translateX(10);
        this.#rightFoot = this.#rightLeg.getFoot();
        this.#rightFoot.translateX(-10);
        this.#feetState = new feetStillState();

        this.#rightArm = new arm.Arm();
        this.#rightArm.position.set(-95, -25, -35);

        this.#leftArm = new arm.Arm();
        this.#leftArm.position.set(95, -25, -35);

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
        console.log(this.hitbox);
        this.reset();
    }

    update() {
        this.#moveFeet();
        this.#moveLegs();
        this.#moveHead();

        this.#updateHeight();
    }

    moveFeetDown() {
        if (this.#feetState.isMoving == false) {
            this.#feetState = new feetDownState();
        }
    }

    moveFeetUp() {
        if (this.#feetState.isMoving == false) {
            this.#feetState = new feetUpState();
        }
    }

    stopFeet() {
        this.#feetState = new feetStillState();
    }

    #moveFeet() {
        this.#feetState.move(this);
    }

    rotateLegsDown() {
        if (this.#legState.isMoving == false) {
            console.log("here");
            this.#legState = new legsDownState();
        }
    }

    rotateLegsUp() {
        if (this.#legState.isMoving == false) {
            console.log("here");
            this.#legState = new legsUpState();
        }
    }

    stopLegs() {
        this.#legState = new legsStillState();
    }

    #moveLegs() {
        this.#legState.move(this);
    }

    rotateHeadDown() {
        if (this.#headState.isMoving == false) {
            this.#headState = new headDownState();
        }
    }

    rotateHeadUp() {
        if (this.#headState.isMoving == false) {
            this.#headState = new headUpState();
        }
    }

    stopHead() {
        this.#headState = new headStillState();
    }

    #moveHead() {
        this.#headState.move(this);
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

    moveArmsInwards() {
        if (this.getLeftArmPositionZ() > -65) {
            this.#leftArm.translateZ(-2);
            this.#rightArm.translateZ(-2);
        }
        else {
            if (this.getLeftArmPositionX() > 65) {
                this.#leftArm.translateX(-2);
                this.#rightArm.translateX(2);
            }
        }
        this.#updateHeight();
    }

    moveArmsOutwards() {
        if (this.getLeftArmPositionX() < 95) {
            this.#leftArm.translateX(2);
            this.#rightArm.translateX(-2);
        }
        else {
            if (this.getLeftArmPositionZ() < -35) {
                this.#leftArm.translateZ(2);
                this.#rightArm.translateZ(2);
            }
        }
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


class armsStillState {
    isMoving = false;

    constructor() {}

    move(robot) {
        // do nothing
    }
}

class armsOutwardsState extends armsStillState {
    isMoving = true;

    moveArmsOutwards(robot) {
        if (robot.getLeftArmPositionX() < 95) {
            robot.getLeftArm().translateX(2);
            robot.getRightArm().translateX(-2);
        }
        else {
            if (robot.getLeftArmPositionZ() < -35) {
                robot.getLeftArm().translateZ(2);
                robot.getRightArm().translateZ(2);
            }
        }
    }
}

class armsInwardsState extends armsStillState {
    isMoving = true;

    moveArmsInwards(robot) {
        if (robot.getLeftArmPositionZ() > -65) {
            robot.getLeftArm().translateZ(-2);
            robot.getRightArm().translateZ(-2);
        }
        else if (robot.getLeftArmPositionX() > 65) {
            robot.getLeftArm().translateX(-2);
            robot.getRightArm().translateX(2);
        }
    }
}

class legsStillState {
    isMoving = false;

    constructor() {}

    move(robot) {
        // do nothing
    }
}

class legsDownState extends legsStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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

class legsUpState extends legsStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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

class feetStillState {
    isMoving = false;

    constructor() { }

    move(robot) {
        // do nothing
    }
}

class feetUpState extends feetStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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

class feetDownState extends feetStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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

class headStillState {
    isMoving = false;

    constructor() { }

    move(robot) {
        // do nothing
    }
}

class headUpState extends headStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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

class headDownState extends headStillState {
    isMoving = true;
    #clock;

    constructor() {
        super();
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
