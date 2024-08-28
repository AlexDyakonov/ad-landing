import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { FloppyDisk } from '../types/FloppyDisk';

export const handleKeyDown = (
    event: KeyboardEvent,
    models: FloppyDisk[],
    primaryDiskIndex: number,
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

    models.forEach((disk, index) => {
        const targetAngle = newAngle + index * moveDistance;
        const posX = Math.cos(targetAngle) * radius;
        const posY = Math.sin(targetAngle) * radius;

        new TWEEN.Tween(disk.model.position)
            .to({ x: posX, z: posY }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

        if (index === primaryDiskIndex) {
            disk.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const material = child.material;
                    if (Array.isArray(material)) {
                        material.forEach(mat => {
                            mat.color.setHex(0xffffff); 
                            mat.needsUpdate = true;
                        });
                    } else {
                        material.color.setHex(0xffffff); 
                        material.needsUpdate = true;
                    }
                }
            });

            scaleUpModel(disk.model);
        } else {
            disk.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const material = child.material;
                    if (Array.isArray(material)) {
                        material.forEach(mat => {
                            mat.color.setHex(0x333333);
                            mat.needsUpdate = true;
                        });
                    } else {
                        material.color.setHex(0x333333); 
                        material.needsUpdate = true;
                    }
                }
            });

            scaleDownModel(disk.model);
        }
    });

    return newAngle;
};

const scaleDownModel = (model: THREE.Object3D) => {
    const scaleFactor = 0.65;
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
};

const scaleUpModel = (model: THREE.Object3D) => {
    const scaleFactor = 1.1;
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
};