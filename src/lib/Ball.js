import AbstractEntity from './AbstractEntity.js'


/**
 * A ball is moving in a constant speed
 * if he hits a bar he makes a noise and changes the direction
 */
export default class Ball extends AbstractEntity {

  constructor(setup) {
    super(setup)
    this.type = this.CONST.TYPE.BALL
    this.form = this.CONST.FORM.CIRCLE
    this.x = setup.x
    this.y = setup.y
    this.radius = setup.radius
    this.speed = setup.speed
    this.radius = setup.radius
    this.isVisible = false
    this.directionX = 1
    this.directionY = 1
    this.color = setup.color
    this.distance = 1
  }

  move() {
    if (this.collision.object) {
      let direction = this.collision.position

      if (direction == 'lefttop') {
        this.directionX *= -1
        this.directionY *= -1
      }
      if (direction == 'righttop') {
        this.directionX *= -1
        this.directionX *= -1
        this.directionY *= -1
      }
      if (direction == 'rightbottom') {
        this.directionX *= -1
        this.directionY *= -1
      }
      if (direction == 'leftbottom') {
        this.directionX *= -1
        this.directionY *= -1
      }

      if (direction == 'left') {
        this.directionX *= -1
        if (this.collision.depth < 0 && this.collision.object.type == this.CONST.TYPE.BAR) {
          this.x += this.collision.depth + this.setup.speed
        }
      }
      if (direction == 'right') {
        this.directionX *= -1
        if (this.collision.depth < 0 && this.collision.object.type == this.CONST.TYPE.BAR) {
          this.x -= this.collision.depth - this.setup.speed
        }
      }
      if (direction == 'top') {
        this.directionY *= -1
        if (this.collision.depth < 0 && this.collision.object.type == this.CONST.TYPE.BAR) {
          this.y += this.collision.depth + this.setup.speed
        }
      }
      if (direction == 'bottom') {
        if (this.collision.object.type == this.CONST.TYPE.WALL) {
          this.reset()
        }
        this.directionY *= -1
        if (this.collision.depth < 0 && this.collision.object.type == this.CONST.TYPE.BAR) {
          this.y -= this.collision.depth - this.setup.speed
        }
      }

      this.uncollide()
    }
    this.y += this.distance * this.directionY
    this.x += this.distance * this.directionX
    return this
  }

  reset() {
    this.isVisible = false
    this.y = this.setup.x
    this.x = this.setup.y
    this.directionX = 1
    this.directionY = 1
  }
}
