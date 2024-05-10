import {Sound} from '../types';

interface CanvasObjects {
  id: number,
  x: number,
  y: number,
  color: string,
}
export interface Ball extends CanvasObjects {
  radius: number;
}

export interface Bar extends CanvasObjects{
  width: number;
  height: number;
  sound: Sound;
}

export interface Balls {
  balls: Ball[];
}


