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

        this.bars.forEach((bar) => {
          this.collisionDetector.detectObjectCollision(ball, bar);
        });

        if (ball.isColliding) {
          const collisionEvent = new CustomEvent('collision', {
            detail: {
              ball: ball,
              bar: ball.collision.object
            }
          });
          document.dispatchEvent(collisionEvent);
        }


        if (ball.y > this.height) {
          ball.reset();
        }
      }
    })
  }

  spawnBall() {
    this.balls.forEach((ball) => {
      if (!ball.isVisible) {
        ball.isVisible = true;
        return ball;
      }
    })
  }

  spawnBar(x, y) {
    let bar = new Bar(setup.bar);
    bar.x = x;
    bar.y = y;
    this.bars.push(bar);
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
    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.context.fillStyle = ball.color;
    this.context.fill();
    this.context.closePath();
  }

  getCollidingBar(x, y) {
    for (let bar of this.bars) {
      if (this.collisionDetector.detectClickCollision({x, y}, bar)) {
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
  }

  moveSelectedBar(x, y) {
    if (this.selectedBar === null) {
      console.error('No bar selected');
      return;
    }
    this.selectedBar.move(x, y);
  }

  selectBar(bar, x, y) {
    this.selectedBar = bar;
    this.selectedBar.setOffset(x, y);
  }

  clearAll() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  redrawAll() {
    this.clearAll();
    this.bars.forEach((bar) => {
      if (bar.isVisible) {
        this.drawBar(bar);
      }
    })
    this.balls.forEach((ball) => {
      if (ball.isVisible) {
        this.drawBall(ball);
      }
    })

  }
}