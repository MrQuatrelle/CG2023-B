import * as THREE from "three";
import camera from "./camera.js";

var scene, renderer;

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    requestAnimationFrame(animate);
    renderer.render(scene, camera.raw);
}

function main() {
    // initializations
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.setTarget(scene.position);

    animate();
}

main();
