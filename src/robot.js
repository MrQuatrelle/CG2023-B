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

    hitboxHelper;
    hitbox;
    towPoint;

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

        const buffer = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        buffer.position.set(0, -110, -160);

        this.towPoint = new THREE.Object3D();
        this.towPoint.position.set(0, -110, -160);

        this.add(this.#body, this.#head,
            this.#leftLeg, this.#rightLeg,
            this.#leftArm, this.#rightArm,
            this.towPoint, buffer);

        this.hitboxHelper = new THREE.BoxHelper(this);
        this.hitbox = new THREE.Box3(this);
        this.reset();
    }

    toggleWireframe() {
        this.parent.traverse((c) => {
            if (c.isMesh) {
                c.material.wireframe = !(c.material.wireframe);
                c.material.needsUpdate = true;
            }
        });
    }

    getLeftArmPositionZ() {
        this.hitboxHelper.update();
        return this.#leftArm.position.z;
    }

    getLeftArmPositionX() {
        this.hitboxHelper.update();
        return this.#leftArm.position.x;
    }

    getRightArmPositionZ() {
        this.hitboxHelper.update();
        return this.#rightArm.position.z;
    }

    getRightArmPositionX() {
        this.hitboxHelper.update();
        return this.#rightArm.position.z;
    }

    reset() {
        this.position.set(110, 370, 280);
        this.hitboxHelper.update();
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
        this.hitboxHelper.update();
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
        this.hitboxHelper.update();
    }

    moveFeetUp() {
        if (this.#leftFoot.rotation.x < Math.PI / 2) {
            this.#leftFoot.rotateX(Math.PI / 64);
            this.#rightFoot.rotateX(Math.PI / 64);
            this.#updateHeight();
        }
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
        this.position.y = offset;
        this.hitboxHelper.update();
        this.hitbox.applyMatrix4(this.matrixWorld);
    }
}

export default {
    Robot: Robot
}
