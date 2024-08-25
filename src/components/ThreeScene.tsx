import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { createTextSprite } from './createTextSprite';
import { handleKeyDown as importedHandleKeyDown } from './handleKeyDown';
import { loadModels } from '../data/floppyData';
import { FloppyDisk } from '../types/FloppyDisk';

const ThreeModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [models, setModels] = useState<FloppyDisk[]>([]);
    const angleRef = useRef(0);

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

        loadModels().then((loadedModels) => {
            setModels(loadedModels);

            const numModels = loadedModels.length;
            const radius = 5; 

            loadedModels.forEach((floppyDisk, i) => {
                const angle = (i / numModels) * Math.PI * 2;
                const posX = Math.cos(angle) * radius;
                const posY = Math.sin(angle) * radius;
                floppyDisk.model.position.set(posX, 0, posY);
                floppyDisk.model.scale.set(1, 1, 1);
                scene.add(floppyDisk.model);
                createTextSprite(floppyDisk.title, floppyDisk.model);
            });

            const keyDownHandler = (event: KeyboardEvent) => {
                angleRef.current = importedHandleKeyDown(event, loadedModels.map(m => m.model), radius, angleRef.current);
            };

            window.addEventListener('keydown', keyDownHandler);

            return () => {
                window.removeEventListener('keydown', keyDownHandler);
            };
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(0, 0, 8);
        camera.lookAt(scene.position);

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
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeModel;
