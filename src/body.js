import * as THREE from "three";
import wheel from "./wheels.js";
import head from "./head.js";


class Body extends THREE.Object3D {
	#head;

	constructor() {
		super();
		const bodyLinesMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
		const chest = this.#generateChest();
		const belly = this.#generateBelly();
		belly.position.set(0, -80, 0);

		const waist = this.#generateWaist();
		waist.position.set(0, -130, 0);
		this.#head = new head.Head();
		this.#head.position.set(0, 20, -20);

		this.add(chest, belly, waist, this.#head);
	}

	#generateChest() {
		const chestMeshMat = new THREE.MeshBasicMaterial({ color: 0x10ff10 });
		//Front part of chest
		const chestMeshGeo1 = new THREE.BoxGeometry(160, 80, 130);
		const chestMesh1 = new THREE.Mesh(chestMeshGeo1, chestMeshMat);
		const chestEdges1 = new THREE.LineSegments(chestMeshGeo1, bodyLinesMat);
		const chest1 = new THREE.Object3D();
		chest1.add(chestMesh1, chestEdges1);

		//Back part of chest
		const chestMeshGeo2 = new THREE.BoxGeometry(100, 80, 30);
		const chestMesh2 = new THREE.Mesh(chestMeshGeo2, chestMeshMat);
		const chestEdges2 = new THREE.LineSegments(chestMeshGeo2, bodyLinesMat);
		const chest2 = new THREE.Object3D();
		chest2.add(chestMesh2, chestEdges2);
		chest2.position.set(0, 0, -80);
		
		const chest = new THREE.Object3D();
		chest.add(chest1, chest2);

		return chest;
	}

	#generateBelly() {
		const bellyMat = new THREE.MeshBasicMaterial({ color: 0x00aa00 });

		const bellyGeo = new THREE.BoxGeometry(160, 50, 130);
		const bellySolid = new THREE.Mesh(bellyGeo, bellyMat);
		const bellyEdges = new THREE.LineSegments(bellyGeo, bodyLinesMat);
		const belly1 = new THREE.Object3D();

		belly1.add(bellySolid);
		belly1.add(bellyEdges);
		belly1.position.set(0, -65, 0);

		const bellyGeo2 = new THREE.BoxGeometry(100, 50, 30);
		const bellySolid2 = new THREE.Mesh(bellyGeo2, bellyMat);
		const bellyEdges2 = new THREE.LineSegments(bellyGeo2, bodyLinesMat);
		const belly2 = new THREE.Object3D();

		belly2.add(bellySolid2);
		belly2.add(bellyEdges2);
		belly2.position.set(0, -65, -80);

		//Under part of belly
		const bellyGeo3 = new THREE.BoxGeometry(100, 30, 160);
		const bellySolid3 = new THREE.Mesh(bellyGeo3, bellyMat);
		const bellyEdges3 = new THREE.LineSegments(bellyGeo3, bodyLinesMat);
		const belly3 = new THREE.Object3D();
		belly3.add(bellySolid3);
		belly3.add(bellyEdges3);
		belly3.position.set(0, -105, -15);

		belly = new THREE.Object3D();
		belly.add(belly1, belly2, belly3);

		return belly;
	}

	#generateWaist() {
		const waistMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
		//Front part of waist
		const waistGeo1 = new THREE.BoxGeometry(160, 20, 20);
		const waistSolid1 = new THREE.Mesh(waistGeo1, waistMat);
		const waistEdges1 = new THREE.LineSegments(waistGeo1, bodyLinesMat);
		const waist1 = new THREE.Object3D();
		waist1.add(waistSolid1);
		waist1.add(waistEdges1);
		waist1.position.set(0, -130, 55);

		//Center part of waist
		const waistGeo2 = new THREE.BoxGeometry(120, 20, 140);
		const waistSolid2 = new THREE.Mesh(waistGeo2, waistMat);
		const waistEdges2 = new THREE.LineSegments(waistGeo2, bodyLinesMat);
		const waist2 = new THREE.Object3D();
		waist2.add(waistSolid2);
		waist2.add(waistEdges2);
		waist2.position.set(0, -130, -25);

		const wheel1 = wheel.createWheel(-70, -135, 20);
		const wheel2 = wheel.createWheel(70, -135, 20);
		
		waist = new THREE.Object3D();
		waist.add(waist1, waist2, wheel1, wheel2);
		return waist;
	}

	reset() {
	    this.position.set(110, 380, 80);
	}
}

export default {
    Body: Body,
}
