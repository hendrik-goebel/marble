import AbstractEntity from "./AbstractEntity";

/**
 * A dropper stores an amount of balls
 * in regular time units he drops a ball out
 */
export default class Dropper extends AbstractEntity {

  constructor(setup, balls) {
    super(setup)
    this._balls = balls
    this.type = this.CONST.TYPE.DROPPER
    this.form = this.CONST.FORM.CIRCLE
    this.x = setup.x
    this.y = setup.y
    this.radius = setup.radius
  }

  dropBall() {
    for (let i in this._balls.items) {
      if (!this._balls.items[i].isVisible) {
        this._balls.items[i].reset()
        this._balls.items[i].activate()
        return
      }
    }
  }

  get balls() {
    return this._balls.toArray();
  }

  set balls(value) {
    this._balls = value;
  }
}