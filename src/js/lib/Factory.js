import Ball from './entities/Ball.js'
import Dropper from './entities/Dropper.js'
import Bar from './entities/Bar.js'
import Queue from './helper/Queue.js'

export default class Factory {

  constructor(setup) {
    this.setup = setup
    this.observers = []
    this.objectObservers = []
  }

  createBall(x = null, y = null) {
    let ball = new Ball(this.setup.ball)
    if (x) {
      ball.x = x
    }
    if (y) {
      ball.y = y
    }
    ball.observers = this.objectObservers
    this.updateObservers(ball)
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
    this.updateObservers(dropper)
    return dropper
  }

  createBar(x = null, y = null) {
    let bar = new Bar(this.setup.bar)
    bar.x = x
    bar.y = y
    this.updateObservers(bar)
    return bar
  }

  updateObservers(value) {
    for (let observer of this.observers) {
      observer(value)
    }
  }

  addObserver(observerFunction) {
    this.observers.push(observerFunction)
  }
  addObjectObserver(observerFunction) {
    this.objectObservers.push(observerFunction)
  }
}