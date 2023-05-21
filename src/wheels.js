import * as THREE from "three";

function createWheel(scaleX, scaleY, scaleZ, posX, posY, posZ) {
    const wheelGeom = new THREE.CylinderGeometry(scaleX, scaleY, scaleZ);
    const wheelMesh = new THREE.Mesh(
        wheelGeom,
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
    );
    const wheelEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(wheelGeom),
        new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 2,
        })
    );

    const wheelHandle = new THREE.Object3D();
    wheelHandle.add(wheelMesh);
    wheelHandle.add(wheelEdges);

    wheelHandle.position.set(posX,posY,posZ);
    
    wheelHandle.rotation.z = Math.PI / 2;

    return wheelHandle;
}

export default{
    createWheel: createWheel,
}