import * as THREE from "three";
import camera from "./camera.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

function animate() {
    // tldr, everytime the program has time to render a frame, it'll call this
    // function
    requestAnimationFrame(animate);
    renderer.render(scene, camera.raw);
}

function main() {
    // initializations
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AxesHelper(400));
    camera.setTarget(scene.position);

    animate();
}

main();

window.addEventListener("resize", () => {
    camera.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
