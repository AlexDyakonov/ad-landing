import * as THREE from 'three';
import { TextLabelOptions } from '../types/TextLabelOptions';

export function createTextLabel(text: string, options: TextLabelOptions = {}): THREE.Mesh {
    const defaultOptions: TextLabelOptions = {
        fontSize: 50,
        maxWidth: 300, 
        color: '#FFFFFF',
        backgroundColor: '#000000',
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        rotateAngle: 0,
        coordinates: new THREE.Vector3(0, 0, 0),
        resolutionMultiplier: 4,
        lineHeight: 1.2,
    };

    options = { ...defaultOptions, ...options };

    const resolutionMultiplier = options.resolutionMultiplier!;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('2D контекст не поддерживается или холст уже инициализирован другим типом контекста.');
    }

    context.font = `${options.fontSize! * resolutionMultiplier}px Arial`;

    const lines = text.split('\n');
    const lineHeight = options.fontSize! * options.lineHeight! * resolutionMultiplier;

    const textWidths = lines.map(line => context.measureText(line).width);
    const textWidth = Math.min(Math.max(...textWidths), options.maxWidth! * resolutionMultiplier);
    const textHeight = lineHeight * lines.length;

    canvas.width = (textWidth + options.padding! * 2 * resolutionMultiplier) | 0;
    canvas.height = (textHeight + options.padding! * 2 * resolutionMultiplier) | 0;

    context.scale(resolutionMultiplier, resolutionMultiplier);

    context.fillStyle = options.backgroundColor!;
    context.fillRect(0, 0, canvas.width / resolutionMultiplier, canvas.height / resolutionMultiplier);

    context.fillStyle = options.color!;
    context.textAlign = options.textAlign!;
    context.textBaseline = 'top';

    lines.forEach((line, index) => {
        const yPosition = options.padding! + (options.fontSize! * options.lineHeight! * index);
        const xPosition = options.textAlign === 'center'
            ? (canvas.width / resolutionMultiplier) / 2
            : options.padding!;

        context.fillText(line, xPosition, yPosition);
        console.log(yPosition)
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    });

    const planeGeometry = new THREE.PlaneGeometry(
        (canvas.width / resolutionMultiplier) / 100,
        (canvas.height / resolutionMultiplier) / 100
    );
    const plane = new THREE.Mesh(planeGeometry, material);

    plane.rotateY(options.rotateAngle!);

    if (Array.isArray(options.coordinates)) {
        plane.position.set(options.coordinates[0], options.coordinates[1], options.coordinates[2]);
    } else {
        plane.position.copy(options.coordinates!);
    }

    return plane;
}
