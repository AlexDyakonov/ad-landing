import * as THREE from 'three';

export function createTextSprite(text: string, model: THREE.Object3D): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    const fontSize = 18;
    const font = `Bold ${fontSize}px Arial`;
    context.font = font;

    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize; 

    const padding = 20;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    const spriteScaleFactor = 0.01; 
    sprite.scale.set(canvas.width * spriteScaleFactor, canvas.height * spriteScaleFactor, 1);

    sprite.position.set(0, 1.5, 0);

    model.add(sprite);
    return sprite;
}