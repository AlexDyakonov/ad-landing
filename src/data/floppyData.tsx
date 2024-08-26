import { GLTFLoader } from 'three-stdlib';
import { FloppyDisk } from '../types/FloppyDisk';

const loader = new GLTFLoader();

const preloadedModels: FloppyDisk[] = [];

interface FloppyDiskData extends Omit<FloppyDisk, 'model'> {}

export const loadModels = (): Promise<FloppyDisk[]> => {
    const modelData: FloppyDiskData[] = [
        { title: 'Floppy Disk 1', text: 'This is the first floppy disk', isPrimary: true },
        { title: 'Floppy Disk 2', text: 'This is the second floppy disk', isPrimary: false },
        { title: 'Floppy Disk 3', text: 'This is the third floppy disk', isPrimary: false },
        { title: 'Floppy Disk 4', text: 'This is the fourth floppy disk', isPrimary: false },
        { title: 'Floppy Disk 5', text: 'This is the fifth floppy disk', isPrimary: false },
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
