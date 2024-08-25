import * as THREE from 'three';

export function createTextSprite(text: string, model: THREE.Object3D): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
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
