import * as THREE from 'three';


export interface TextLabelOptions {
    fontSize?: number;
    maxWidth?: number;
    color?: string;
    backgroundColor?: string;
    textAlign?: CanvasTextAlign;
    borderRadius?: number;
    padding?: number;
    rotateAngle?: number; 
    coordinates?: THREE.Vector3 | [number, number, number]; 
    resolutionMultiplier?: number; 
    lineHeight?: number;
}