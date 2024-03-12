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
    this._isSelected = true
    this.offset = {
      'x': 0,
      'y': 0
    }
    this.fixed = true
    this.soundId = null

    this.colorUnselected = setup.color
    this.colorSelected = setup.colorSelected
    this.startColorUnselected = this.colorUnselected
    this.startColorSelected =  this.colorSelected
    this.color = this.colorUnselected

    /**
     * Increases by 1 on every collision
     */
    this.collisionCounter = 0
    /**
     * The collision value on which a sound should be played
     * 2 = play sound on every second collision
     * 3 = play sound on every third collision
     * ...
     */
    this._noisyCollisionValue = 1
  }

  get isSelected() {
    return this._isSelected
  }

  set noisyCollisionValue(value) {
    if (this.isSelected) {
      this.color = this.startColorSelected
    } else {
      this.color = this.startColorUnselected
    }

    this._noisyCollisionValue = value
  }

  getColorReducedByIndex(color, index) {
    return this.luminance(color, -1 * (((this.noisyCollisionValue+1 - index) * 5) / 100))
  }

  get noisyCollisionValue() {
    return this._noisyCollisionValue
  }

  set isSelected(value) {
    if (value) {
      this._isSelected = true
      this.color = this.colorSelected
    } else {
      this._isSelected = false
      this.color = this.colorUnselected
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

  get isNoisyCollision() {
    let value = this.collisionCounter == this._noisyCollisionValue
    return value
  }

  increaseCollisionCounter() {
    this.collisionCounter++
    if (this.collisionCounter > this.setup.maxCollisionCount || this.collisionCounter > this.noisyCollisionValue) {
      this.collisionCounter = 1
    }

    console.log(this.collisionCounter)

    if (this.isNoisyCollision) {
      this.colorSelected = this.startColorSelected
      this.colorUnselected = this.startColorUnselected
      console.log("is noisy collision")
    } else {
      this.colorSelected = this.getColorReducedByIndex(this.startColorSelected, this.collisionCounter)
      this.colorUnselected = this.getColorReducedByIndex(this.startColorUnselected, this.collisionCounter)
    }

    if (this.isSelected) {
      this.color = this.colorSelected
    } else {
      this.color = this.colorUnselected
    }
  }

  collide(object, position, depth, subPosition) {
    super.collide(object, position, depth, subPosition)
  }

  luminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }
}
