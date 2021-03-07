import AbstractObject from "./AbstractObject";

/**
 * A dropper stores an amount of balls
 * in regular time units he drops a ball out
 */
export default class Dropper extends AbstractObject{

  constructor(setup, balls) {

    super(setup)
    this.radius = setup.radius
    this.balls = balls
    this.type = 'dropper'
  }
}