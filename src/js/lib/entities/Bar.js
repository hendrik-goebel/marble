import AbstractEntity from './AbstractEntity.js'

export default class Bar extends AbstractEntity {

  constructor(setup) {
    super(setup)
    this._setup = setup;
    this.type = this.CONST.TYPE.BAR
    this.form = this.CONST.FORM.RECTANGLE
    this.width = setup.minWidth
    this.height = setup.minHeight
    this.minWidth = setup.minWidth;
    this.minHeight = setup.minHeight;
    this.color = setup.color
    this.activate()
    this._isSelected = true
    this.offset = {
      'x': 0,
      'y': 0
    }
    this.fixed = true
    this.sound = null

    /**
     * Increases by 1 on every collision
     */
    this.collisionCounter = 1
    /**
     * The collision value on which a sound should be played
     * 2 = play sound on every second collision
     * 3 = play sound on every third collision
     * ...
     */
    this.noisyCollisionValue = 1
  }

  get isSelected() {
    return this._isSelected
  }

  set isSelected(value) {

    if (value) {
      this._isSelected = true
      this.color = this._setup.colorSelected
    } else {
      this._isSelected = false
      this.color = this._setup.color
    }
  }

  move(x, y) {
    this.x = x - this.offset.x
    this.y = y - this.offset.y
  }

  moveOnBallCollision() {
    if (!this.isColliding) {
      return
    }
    if (this.collision.object.type != this.CONST.TYPE.BALL) {
      return
    }

    let position = this.collision.position
    if (position == 'top') {
      this.y += this.collisionSpeed
    }
    if (position == 'bottom') {
      this.y -= this.collisionSpeed
    }
    if (position == 'left') {
      this.x += this.collisionSpeed
    }
    if (position == 'right') {
      this.x -= this.collisionSpeed
    }
  }

  get collisionSpeed() {
    return this.setup.collisionSpeed
  }

  setOffset(x, y) {
    this.offset.x = x - this.x
    this.offset.y = y - this.y
  }

  get isNoisyCollision()
  {
    let value =  this.collisionCounter % this.noisyCollisionValue== 0
    return value
  }

  increaseCollisionCounter() {
    this.collisionCounter++

    if (this.collisionCounter > this._setup.maxCollisionCount) {
      this.collisionCounter = 1
    }
  }

  collide(object, position, depth, subPosition) {
    super.collide(object, position, depth, subPosition)
  }
}
