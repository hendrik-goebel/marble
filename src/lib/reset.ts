import { Ball } from './models/CanvasObjects';

export function ball(ball: Ball) {
  ball.x = ball.radius + 1;
  ball.y = ball.radius + 1;
}