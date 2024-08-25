import { GLTFLoader } from 'three-stdlib';
import { FloppyDisk } from '../types/FloppyDisk';

const loader = new GLTFLoader();

const preloadedModels: FloppyDisk[] = [];

export const loadModels = (): Promise<FloppyDisk[]> => {
    const modelData: Omit<FloppyDisk, 'model'>[] = [
        { title: 'Floppy Disk 1', text: 'This is the first floppy disk' },
        { title: 'Floppy Disk 2', text: 'This is the second floppy disk' },
        { title: 'Floppy Disk 3', text: 'This is the third floppy disk' },
        { title: 'Floppy Disk 4', text: 'This is the fourth floppy disk' },
        { title: 'Floppy Disk 5', text: 'This is the fifth floppy disk' },
    ];

    const promises = modelData.map((data, i) =>
        new Promise<FloppyDisk>((resolve, reject) => {
            loader.load(
                '/models/floppy.glb',
                (gltf) => {
                    const model = gltf.scene;
                    resolve({ model, title: data.title, text: data.text });
                    console.log("Loaded floppy disk", i)
                },
                undefined,
                (error) => reject(error)
            );
        })
    );

    return Promise.all(promises).then((models) => {
        preloadedModels.push(...models);
        return preloadedModels;
    });
};
