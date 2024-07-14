import {Sound} from '../types';

export interface CanvasObject {
  id: number,
  x: number,
  y: number,
  color: string,
}

export interface Ball extends CanvasObject {
  radius: number;
  directionX: number,
  directionY: number;
}

export interface Bar extends CanvasObject {
  width: number;
  height: number;
  sound: Sound;
}


