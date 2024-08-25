import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

const ThreeModel = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 3);
        scene.add(ambientLight);

        const loader = new GLTFLoader();
        const positions = [-3, -1, 1, 3]; 

        function createTextSprite(text, position) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = 'Bold 40px Arial';
            context.fillStyle = 'rgba(255, 255, 255, 1.0)';
            context.fillText(text, 50, 50);

            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;

            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(0.5, 0.25, 1.0); 
            sprite.position.copy(position.clone().add(new THREE.Vector3(0, 2, 0)));

            return sprite;
        }

        positions.forEach((posX, index) => {
            loader.load(
                '/models/floppy.glb',
                (gltf) => {
                    const model = gltf.scene;
                    model.position.set(posX, 0, 0);
                    model.scale.set(1, 1, 1);
                    scene.add(model);

                    const sprite = createTextSprite(`Object ${index + 1}`, new THREE.Vector3(posX, 0, 0));
                    scene.add(sprite);
                },
                undefined,
                (error) => {
                    console.error(`An error happened while loading model ${index + 1}`, error);
                }
            );
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.z = 5;

        const handleKeyDown = (event) => {
            const moveDistance = 0.5;
            switch (event.key) {
                case 'ArrowUp':
                    camera.position.y += moveDistance;
                    break;
                case 'ArrowDown':
                    camera.position.y -= moveDistance;
                    break;
                case 'ArrowLeft':
                    camera.position.x -= moveDistance;
                    break;
                case 'ArrowRight':
                    camera.position.x += moveDistance;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeModel;
