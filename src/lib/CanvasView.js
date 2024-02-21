import constants from "./Constants"

export default class CanvasView {

  constructor(context) {
    this.context = context
    this.CONST = constants
    this.width = 0
    this.height = 0
  }

  draw(object) {
    if (object.type === this.CONST.TYPE.BALL) {
      this.drawBall(object)
    }
  }
  drawBall(ball) {
    if (ball.xb === ball.x || ball.yb === ball.y) {
      return
    }

    this.clearBall(ball);

    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.context.fillStyle = ball.color;
    this.context.fill();
    this.context.closePath();
  }
  clearBall(ball) {
    if (ball.xb && ball.yb) {
      this.context.clearRect(
        ball.xb - ball.radius,
        ball.yb - ball.radius,
        ball.radius * 2,
        ball.radius * 2);
    }
  }
}