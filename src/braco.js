import * as THREE from "three";

class Arm extends THREE.Object3D {
    
    constructor(){
        super();
        const arm = this.#generateArm();
        const forearm = this.#generateForearm();
        const tube = this.#generateTube();
        forearm.position.set(0, -80, 65);
        tube.position.set(0, 65, -20)
        this.add(arm, forearm, tube);
    }
    
    #generateArm(){
        const armGeom = new THREE.BoxGeometry(30,130,30);
        const arm = new THREE.Mesh(armGeom);
        const armEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(armGeom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 2,
            })
        );
        const armHandler = new THREE.Object3D();
        armHandler.add(arm);
        armHandler.add(armEdges);
        return armHandler;
    }
    
    #generateForearm(){
        const forearmGeom = new THREE.BoxGeometry(30, 30, 160);
        const forearm = new THREE.Mesh(forearmGeom,
            new THREE.MeshBasicMaterial({color: 0xff0000}));
        const forearmEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(forearmGeom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 2 })
            );
        const forearmHandler = new THREE.Object3D();
        forearmHandler.add(forearm);
        forearmHandler.add(forearmEdges);
        return forearmHandler;
    }

    #generateTube(){
        const tubeGeom = new THREE.CylinderGeometry(10, 10,80, 20);
        const tube = new THREE.Mesh(
            tubeGeom,
            new THREE.MeshBasicMaterial({color: 0xff0000}));
        const tubeEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(tubeGeom),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                linewidth: 2}));
        const tubeHandler = new THREE.Object3D();
        tubeHandler.add(tube);
        tubeHandler.add(tubeEdges);
        return tubeHandler;
    }
}

export default {
    Arm: Arm
}


