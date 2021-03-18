import AbstractEntity from './AbstractEntity.js'

/**
 * A ball is moving in a constant speed
 * if he hits a bar he makes a noise and changes the direction
 */
export default class Ball extends AbstractEntity {

  constructor(setup) {
    super(setup)
    this.type = 'ball'
    this.form = 'circle'
    this.x = setup.x
    this.y = setup.y
    this.radius = setup.radius
    this.speed = setup.speed
    this.radius = setup.radius
    this.isVisible = false
    this.directionX = 1
    this.directionY = 1
    this.color = setup.color
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
        if(this.collision.depth < 0) {
          this.x += this.collision.depth
        }
      }
      if (direction == 'right') {
        this.directionX *= -1
        if(this.collision.depth < 0) {
          this.x -= this.collision.depth
        }
      }
      if (direction == 'top') {
        this.directionY *= -1
        if(this.collision.depth < 0) {
          this.y += this.collision.depth
        }
      }
      if (direction == 'bottom') {
        if (this.collision.object.type == 'canvas') {
          this.deactivate()
        }
        this.directionY *= -1
      }

      this.uncollide()
    }
    this.y += this._speed * this.directionY
    this.x += this._speed * this.directionX
    return this
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }
}
