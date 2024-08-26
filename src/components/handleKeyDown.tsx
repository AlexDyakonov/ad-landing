import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export const handleKeyDown = (
    event: KeyboardEvent,
    models: THREE.Object3D[],
    radius: number,
    angle: number 
) => {
    const moveDistance = Math.PI * 2 / models.length;
    let newAngle = angle; 

    switch (event.key) {
        case 'ArrowLeft':
            newAngle -= moveDistance;
            break;
        case 'ArrowRight':
            newAngle += moveDistance;
            break;
    }

    models.forEach((model, index) => {
        const targetAngle = newAngle + index * moveDistance;
        const posX = Math.cos(targetAngle) * radius;
        const posY = Math.sin(targetAngle) * radius;

        new TWEEN.Tween(model.position)
            .to({ x: posX, z: posY }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    });

    return newAngle; 
};
