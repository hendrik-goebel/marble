import { Bar } from './models/CanvasObjects';
export function isPositionInsideBar(x: number, y: number, bar: Bar): boolean {
  return x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height;
}