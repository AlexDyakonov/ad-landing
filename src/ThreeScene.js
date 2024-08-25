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
        const numModels = 4; 
        const radius = 5; 
        const models = [];

        function createTextSprite(text, model) {
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
            sprite.position.set(0, 2, 0);

            model.add(sprite);
            return sprite;
        }

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

        let angle = 0;

        const handleKeyDown = (event) => {
            const moveDistance = 0.05;
            switch (event.key) {
                case 'ArrowLeft':
                    angle -= moveDistance;
                    break;
                case 'ArrowRight':
                    angle += moveDistance;
                    break;
            }

            models.forEach((model, index) => {
                const posX = Math.cos(angle + index * Math.PI / 2) * radius;
                const posY = Math.sin(angle + index * Math.PI / 2) * radius;
                model.position.set(posX, 0, posY);
            });
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
