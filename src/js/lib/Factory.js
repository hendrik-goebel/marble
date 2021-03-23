import Ball from './entities/Ball.js'
import Dropper from './entities/Dropper.js'
import Bar from './entities/Bar.js'
import Queue from './helper/Queue.js'

export default class Factory {

  createBall(x = null, y = null) {
    let ball = new Ball(this.setup.ball)
    if (x) {
      ball.x = x
    }
    if (y) {
      ball.y = y
    }
    return ball
  }

  createDropper(x = null, y = null) {

    let balls = new Queue([])
    let dropper = new Dropper(this.setup.dropper)
    if (x) {
      dropper.x = x
    }
    if (y) {
      dropper.y = y
    }

    for (let i = 0; i < this.setup.dropper.maxBalls; i++) {
      balls.enqueue(this.createBall(dropper.x, dropper.y))
    }
    dropper.balls = balls
    return dropper
  }

  createBar(x = null, y = null, width = null, height = null) {

    let bar = new Bar(this.setup.bar)
    bar.x = x
    bar.y = y
    if (width) {
      bar.width = width
    }
    if (height) {
      bar.height = height
    }
    return bar
  }
}