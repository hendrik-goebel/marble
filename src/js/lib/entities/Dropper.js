import AbstractEntity from "./AbstractEntity";

/**
 * A dropper stores an amount of balls
 * in regular time units he drops a ball out
 */
export default class Dropper extends AbstractEntity{

  constructor(setup, balls) {
    super(setup)
    this._balls = balls
    this.type = 'dropper'
    this.form = 'circle'
    this.x = setup.x
    this.y = setup.y
    this.radius = setup.radius
  }

  dropBall() {
    let ball = this._balls.dequeue().activate()
    ball.x = this.x
    ball.y = this.y
    ball.activate()
    this._balls.enqueue(ball)
  }

  get balls() {
    return this._balls.toArray();
  }

  set balls(value) {
    this._balls = value;
  }
}