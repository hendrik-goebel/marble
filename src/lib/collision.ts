import {Bar, Ball} from './models/CanvasObjects';
import {Canvas} from './types';

export type CollisionPosition = 'top' | 'bottom' | 'left' | 'right' | null;

interface Collision {
  ball: Ball,
  bar: Bar,
  position: CollisionPosition
}


export function isPositionInsideBar(x: number, y: number, bar: Bar): boolean {
  return x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height;
}

export function ballWithCanvas(ball: Ball, canvas: Canvas): CollisionPosition {

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

export function ballWithBar(ball: Ball, bars: Bar[]): Collision|null{
  for (const bar of bars) {
    const collision = isBallCollidingWithBar(ball, bar);
    if (collision)  {
      return collision;
    }
  }
  return null;
}

function isBallCollidingWithBar(ball: Ball, bar: Bar): Collision|null {

  let testX = ball.x
  let testY = ball.y
  let position: CollisionPosition = null;
  let subPosition = ''

  /**
   * find closest edge
   */
  if (ball.x < bar.x) {
    position = 'left'
    testX = bar.x
  } else if (ball.x > bar.x + bar.width) {
    testX = bar.x + bar.width
    position = 'right'
  }
  if (ball.y < bar.y) {
    position = 'top'
    testY = bar.y
  } else if (ball.y > bar.y + bar.height) {
    position = 'bottom'
    testY = bar.y + bar.height
  }

  /*
  * Calculate distance to closest edge
  */
  let distX = ball.x - testX;
  let distY = ball.y - testY;
  let distance = Math.floor(Math.sqrt((distX * distX) + (distY * distY)));

  let difference = distance - ball.radius
  if (distance < ball.radius) {
    //calculate the more specific subPosition
    if (position == 'top' || position == 'bottom') {
      let center = ((bar.width - bar.x) / 2) + bar.x;
      if ((ball.x + ball.radius) < center) {
        subPosition = 'left'
      }
      if ((ball.x - ball.radius) >= center) {
        subPosition = 'right'
      }
    }

    if (position == 'left' || position == 'right') {
      let center = ((bar.height - bar.y) / 2) + bar.y
      if ((ball.y + ball.radius) < center) {
        subPosition = 'top'
      }
      if ((ball.y + ball.radius) >= center) {
        subPosition = 'bottom'
      }
    }
    return {
      ball: ball,
      bar: bar,
      position: position
    }
  }
  return null;
}