import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import TWEEN from '@tweenjs/tween.js';
import { createTextSprite } from './createTextSprite';
import { handleKeyDown as importedHandleKeyDown } from './handleKeyDown';
import { loadModels } from '../data/floppyData';
import { FloppyDisk } from '../types/FloppyDisk';

let activeObjectIndex = 0;

const ThreeModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [models, setModels] = useState<FloppyDisk[]>([]);
    const angleRef = useRef(0);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight("#FFA07A", 1);
        scene.add(ambientLight);

        loadModels().then((loadedModels) => {
            setModels(loadedModels);

            const radius = 4;
            loadedModels.forEach((floppyDisk, i) => {
                const angle = (i / loadedModels.length) * Math.PI * 2;
                const posX = Math.cos(angle) * radius;
                const posY = Math.sin(angle) * radius;
                floppyDisk.model.position.set(posX, 0, posY);
                floppyDisk.model.rotation.y = 60 * (Math.PI / 180);
                createTextSprite(floppyDisk.title, floppyDisk.model);
                scene.add(floppyDisk.model);
            });

            const keyDownHandler = (event: KeyboardEvent) => {

                if (event.key === 'ArrowRight') {
                    activeObjectIndex = (activeObjectIndex - 1 + loadedModels.length) % loadedModels.length;
                } else if (event.key === 'ArrowLeft') {
                    activeObjectIndex = (activeObjectIndex + 1) % loadedModels.length;
                }

                angleRef.current = importedHandleKeyDown(event, loadedModels, activeObjectIndex, radius, angleRef.current);
            };
            

            window.addEventListener('keydown', keyDownHandler);

            return () => {
                window.removeEventListener('keydown', keyDownHandler);
            };
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(5.5, 0, 2.3);

        const animate = function () {
            requestAnimationFrame(animate);
            TWEEN.update();
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeModel;
