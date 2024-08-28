import React, { useRef, useEffect, useState } from 'react';
import { OrbitControls } from 'three-stdlib';
import TWEEN from '@tweenjs/tween.js';
import { createTextSprite } from './createTextSprite';
import { handleKeyDown as importedHandleKeyDown } from './handleKeyDown';
import { loadModels } from '../data/floppyData';
import { configureScene } from './sceneConfig';  // Импортируем конфигурацию сцены
import { FloppyDisk } from '../types/FloppyDisk';

let activeObjectIndex = 0;

const ThreeModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [models, setModels] = useState<FloppyDisk[]>([]);
    const angleRef = useRef(0);

    useEffect(() => {
        if (!mountRef.current) return;

        const { scene, camera, renderer } = configureScene();

        mountRef.current.appendChild(renderer.domElement);

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
