import {Bar, Ball} from './models/CanvasObjects';
import {Canvas} from './types';

type CollisionPosition =  'top' | 'bottom' | 'left' | 'right' | null;


export function isPositionInsideBar(x: number, y: number, bar: Bar): boolean {
  return x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height;
}

export function ballWithCanvas(ball: Ball, canvas: Canvas): CollisionPosition  {

  if (ball.x - ball.radius <= 0)
    return 'left'
  if (ball.x + ball.radius >= canvas.width)
    return 'right'
  if (ball.y - ball.radius <= 0)
    return 'top'
  if (ball.y + ball.radius >= canvas.height)
    return 'bottom'

  return null;
}