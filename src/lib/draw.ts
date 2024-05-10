import {Ball, Bar} from "./models/CanvasObjects";
import setup from './setup';

export function clear(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, setup.app.canvas.width, setup.app.canvas.height);
}

export function balls(context: CanvasRenderingContext2D, balls: Ball[]) {
  for (const ballObject of balls) {
    ball(context, ballObject)
  };
}
export function bars(context: CanvasRenderingContext2D, bars: Bar[]) {
  for (const barObject of bars) {
    bar(context, barObject)
  };
}
export function ball(context: CanvasRenderingContext2D, ball: Ball) {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
  context.fillStyle = ball.color;
  context.fill();
}

export function bar(context: CanvasRenderingContext2D, bar: Bar) {
  context.beginPath();
  context.rect(bar.x, bar.y, bar.width, bar.height);
  context.fillStyle = bar.color;
  context.fill();
}