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

        this.collisionDetector.detectCanvasBorderCollision(ball, {x: 0, y: 0, width: this.width, height: this.height, type: 'wall'});
      }
    })
  }

  spawnBall() {
    for (let ball of this.balls)
      if (!ball.isVisible) {
        ball.isVisible = true;
        this.drawBall(ball);
        return ball;
      }
  }
  spawnBar(x, y) {
    let bar = new Bar(setup.bar);
    bar.x = x;
    bar.y = y;
    this.bars.push(bar);

    const barSpawnEvent = new CustomEvent('barSpawned', {
      detail: {
        bar: bar
      }
    });
    document.dispatchEvent(barSpawnEvent);
    return bar;
  }

  drawBar(bar) {
    this.context.beginPath();
    this.context.rect(bar.x, bar.y, bar.width, bar.height);
    this.context.fillStyle = bar.color;
    this.context.fill();
    this.context.closePath();
  }

  deleteBar(bar) {
    this.bars = this.bars.filter((b) => b !== bar);
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
    const selectBarEvent = new CustomEvent('barSelected', {
      detail: {
        bar: bar
      }
    });
    document.dispatchEvent(selectBarEvent);
  }

  clearAll() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  redrawAll() {
    this.clearAll();
    for (let bar of this.bars) {
      if (bar.isVisible) {
        this.drawBar(bar);
      }
    }
    for (let ball of this.balls) {
      if (ball.isVisible) {
        this.drawBall(ball);
      }
    }
  }
}