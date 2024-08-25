import * as THREE from 'three';

export type FloppyDisk = {
    model: THREE.Object3D; // 3D модель
    title: string;         // Заголовок
    text: string;          // Текст
};