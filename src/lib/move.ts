import { Ball } from './models/CanvasObjects';

export function ball(ball: Ball, distance: number) {
  ball.x += distance * ball.directionX;
  ball.y += distance * ball.directionY;
}