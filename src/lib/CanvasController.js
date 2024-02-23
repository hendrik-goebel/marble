import setup from "./Setup";
import Ball from "./Ball";
import Bar from "./Bar";
import CollisionDetector from "./CollisionDetector";

/**
 * Coordinates all visual elements on the canvas
 */
export default class CanvasController {
  constructor(context) {
    this.context = context;
    this.width = 0;
    this.height = 0;
    this.balls = [];
    this.bars = [];
    this.collisionDetector = new CollisionDetector();
    this.selectedBar = null;
  }

  initBalls() {
    this.balls = []
    for (let i = 0; i < setup.dropper.maxBalls; i++) {
      this.balls.push(new Ball(setup.ball))
    }
    this.balls[this.balls.length - 1].isVisible = true;
  }

  moveBalls(distance) {
    this.balls.forEach((ball) => {
      if (ball.isVisible) {
        ball.distance = distance;
        ball.move();
        this.drawBall(ball);
      }

      if (ball.yb > this.height) {
        this.clearBall(ball);
        ball.reset();
      }

      if (ball.isVisible) {
        this.drawBall(ball);
      }
    })
  }

  spawnBall() {
    this.balls.forEach((ball) => {
      if (!ball.isVisible) {
        ball.isVisible = true
        return
      }
    })
  }

  spawnBar(x, y) {
    let bar = new Bar(setup.bar);
    bar.x = x;
    bar.y = y;
    this.bars.push(bar);
    this.drawBar(bar);
    return bar;
  }


  drawBar(bar) {
    this.context.beginPath();
    this.context.rect(bar.x, bar.y, bar.width, bar.height);
    this.context.fillStyle = bar.color;
    this.context.fill();
    this.context.closePath();
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

  getCollidingBar(x, y) {
    for (let bar of this.bars) {
      if (this.collisionDetector.detectObjectCollision({ x, y }, bar)) {
        return bar;
      }
    }
    return null;
  }

  extendSelectedBar(x, y) {
    if (this.selectedBar === null) {
      console.error('No bar selected');
      return;
    }
    this.selectedBar.width = x - this.selectedBar.x;
    this.selectedBar.height = y - this.selectedBar.y;
    this.drawBar(this.selectedBar);
  }

  selectBar(bar) {
   this.selectedBar = bar;
  }
}