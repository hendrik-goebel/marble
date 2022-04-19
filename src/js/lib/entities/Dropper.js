import AbstractEntity from "./AbstractEntity";
import Factory from './../Factory'

/**
 * A dropper stores an amount of balls
 * in regular time units he drops a ball out
 */
export default class Dropper extends AbstractEntity {
  constructor(setup) {
    super(setup)
    this.type = this.CONST.TYPE.DROPPER
    this.form = this.CONST.FORM.CIRCLE
    this.x = setup.x
    this.y = setup.y
    this.radius = setup.radius
    this.factory = new Factory()
    this.balls = []
  }

  dropBall() {
    if (this.balls.length < this.setup.maxBalls) {
      let ball = this.factory.createBall(this.x, this.y)
      ball.isVisible = true
      ball.activate()
      this.balls.push(ball)
    }
  }
}