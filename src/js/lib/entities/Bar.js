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

  setOffset(x, y) {
    this.offset.x = x -this.x
    this.offset.y = y -this.y
  }
}
