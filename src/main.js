import * as THREE from "three";
import camera from "./camera.js";
import body from "./body.js";
import head from "./head.js";

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

    scene.add(new THREE.AxesHelper(600));
    camera.setTarget(scene.position);
    scene.add(body.body);
    scene.add(head.head);

    animate();
}

main();

window.addEventListener("resize", () => {
    camera.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
