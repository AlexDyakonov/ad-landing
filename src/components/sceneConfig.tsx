import * as THREE from 'three';

export const configureScene = () => {
    const scene = new THREE.Scene();
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv.y, vUv.y, 1.0, 1.0); // Градиент от синего к белому
        }
    `;

    const gradientMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.BackSide
    });

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const gradientBackground = new THREE.Mesh(geometry, gradientMaterial);
    scene.add(gradientBackground);

    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5.5, 0, 2.3);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    return {
        scene,
        camera,
        renderer,
    };
};
