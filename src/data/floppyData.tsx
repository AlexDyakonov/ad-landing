import { GLTFLoader } from 'three-stdlib';
import { FloppyDisk } from '../types/FloppyDisk';

const loader = new GLTFLoader();

const preloadedModels: FloppyDisk[] = [];

interface FloppyDiskData extends Omit<FloppyDisk, 'model'> {}

export const loadModels = (): Promise<FloppyDisk[]> => {
    const modelData: FloppyDiskData[] = [
        { title: 'Main Info', text: 'This is the first floppy disk', isPrimary: true },
        { title: 'Technologies and Tools', text: 'This is the second floppy disk', isPrimary: false },
        { title: 'Projects ', text: 'This is the third floppy disk', isPrimary: false },
        { title: 'Shamp.Dev', text: 'This is the fourth floppy disk', isPrimary: false },
        { title: 'Hobbies', text: 'This is the fifth floppy disk', isPrimary: false },
    ];

    const promises = modelData.map((data, i) =>
        new Promise<FloppyDisk>((resolve, reject) => {
            loader.load(
                '/models/floppy.glb',
                (gltf) => {
                    const model = gltf.scene;
                    resolve({ ...data, model });
                    console.log("Loaded floppy disk", i);
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
