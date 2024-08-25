import * as THREE from 'three';

export const handleKeyDown = (
    event: KeyboardEvent,
    models: THREE.Object3D[],
    radius: number,
    angle: number
) => {
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

    return angle;
};
