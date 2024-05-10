import {Ball, Bar} from "./models/CanvasObjects";

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