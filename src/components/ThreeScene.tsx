import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { createTextSprite } from './createTextSprite';
import { handleKeyDown as importedHandleKeyDown } from './handleKeyDown';

const ThreeModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    let angle = 0; 

    useEffect(() => {
        if (!mountRef.current) return;

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
        const numModels = 4; 
        const radius = 5; 
        const models: THREE.Object3D[] = [];

        for (let i = 0; i < numModels; i++) {
            const angle = (i / numModels) * Math.PI * 2;
            const posX = Math.cos(angle) * radius;
            const posY = Math.sin(angle) * radius;
            loader.load(
                '/models/floppy.glb',
                (gltf) => {
                    const model = gltf.scene;
                    model.position.set(posX, 0, posY);
                    model.scale.set(1, 1, 1);
                    scene.add(model);
                    models.push(model);

                    createTextSprite(`Object ${i + 1}`, model);
                },
                undefined,
                (error) => {
                    console.error(`An error happened while loading model ${i + 1}`, error);
                }
            );
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(0, 0, 8);
        camera.lookAt(scene.position);

        const keyDownHandler = (event: KeyboardEvent) => {
            angle = importedHandleKeyDown(event, models, radius, angle);
        };

        window.addEventListener('keydown', keyDownHandler);

        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeModel;
