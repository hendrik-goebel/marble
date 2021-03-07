import Ball from './objects/Ball.js'
import Dropper from './objects/Dropper.js'

export default class Factory {

  constructor(setup) {
    this.setup = setup
  }

  createBall() {

    return new Ball(this.setup.ball)
  }

  createDropper() {
    let balls = []
    for (let i=0; i<this.setup.dropper.maxBalls; i++) {
      balls.push(this.createBall())
    }
    let dropper = new Dropper(this.setup.dropper, balls)
    return dropper
  }
}