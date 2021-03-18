export default class AbstractEntity {
  constructor(setup) {

    this.setup = setup
    this._id = null
    this._radius = null
    this._width = null
    this._height = null
    this._minWidth = null
    this._minHeight = null
    this._x = null
    this._y = null
    this._isVisible = true

    this.collision = {
      'object': null,
      'position': null,
      'depth': null
    }
    this._form = 'rectangle'
    this.observers = []
    this.id = Math.random().toString(36).substring(7)
  }

  get isColliding() {
    if (this.collision.object) {
      return true
    }
    return false
  }

  uncollide() {
    this.collision.object = null
    this.collision.position = null
    this.collision.depth = null
  }

  collide(object, position, depth) {
    this.collision.object = object
    this.collision.position = position
    this.collision.depth = depth
  }

  activate() {
    this.isVisible = true
    for (let observer of this.observers) {
      observer(this, 'activated')
    }
    return this
  }

  deactivate() {
    this.isVisible = false
    for (let observer of this.observers) {
      observer(this, 'deactivated')
    }
    return this
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set width(value) {
    this._width = Math.floor(value);
    if (this._width < this.minWidth) {
      this._width = this.minWidth
    }

  }

  set height(value) {
    this._height = Math.floor(value);
    if (this._height < this.minHeight) {
      this._height = this.minHeight
    }
  }

  get minWidth() {
    return this._minWidth;
  }

  set minWidth(value) {
    this._minWidth = value;
  }

  get minHeight() {
    return this._minHeight;
  }

  set minHeight(value) {
    this._minHeight = value;
  }

  set radius(value) {
    this._radius = Math.floor(value)
  }

  get radius() {
    return this._radius
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = Math.floor(value);
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = Math.floor(value);
  }

  set xStart(value) {
    this._xStart = value;
  }


  get isVisible() {
    return this._isVisible;
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  get form() {
    return this._form;
  }

  set form(value) {
    this._form = value;
  }

  set id(value) {
    this._id = value
  }

  get id() {
    return this._id
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  /**
   * abstract
   */
  move() {
  }
}