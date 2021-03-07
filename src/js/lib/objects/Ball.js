import AbstractObject from './AbstractObject.js'

/**
 * A ball is moving in a constant speed
 * if he hits a bar he makes a noise and changes the direction
 */
export default class Ball extends AbstractObject {

  constructor(setup) {
    super(setup)
    this.type = 'ball'
    this.radius = setup.radius
    this.speed = setup.speed
    this.a = 1
  }

  move() {
    this.y += this.speed
  }
}
