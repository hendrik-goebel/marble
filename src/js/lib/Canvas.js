import setup from "./Setup";

/**
 * A Canvas paints objects
 */
export default class Canvas {

  constructor(createjs) {
    this.createjs = createjs
    this.stage = new this.createjs.Stage("canvas");
  }

  addBall(ball) {
    let circle = this._createShape();
    let x = ball.x
    let y = ball.y
    let radius = ball.radius
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(ball.x, ball.y, ball.radius);
    this.stage.addChild(circle);
  }

  addBar(bar) {
    let rect = this._createShape();
    rect.graphics.beginFill("DeepSkyBlue").drawRect(bar.x, bar.y, bar.width, bar.height);
    this.stage.addChild(rect);
  }

  addDropper(dropper) {
    let circle = this._createShape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(dropper.x, dropper.y, dropper.radius);
    this.stage.addChild(circle);
  }

  clear() {
    this.stage.removeAllChildren();
  }

  _createShape() {
    return new this.createjs.Shape()
  }

  update() {
    this.stage.update();
  }

  /**
   * Sets the correct width and height
   */
  prepare() {
    let $canvas = document.getElementById('canvas')
    let $canvasContainer = document.getElementById('canvas-container')
    let width = $canvasContainer.offsetWidth
    let height = $canvasContainer.offsetHeight
    $canvas.setAttribute('height', height)
    $canvas.setAttribute('width', width)

    return {
      'width': width,
      'height': height
    }
  }

  resize() {
    let dimensions = this.prepare()
    this.update()
    return dimensions
  }

  listen() {
    let canvas = this
    let Observable = this.Observable

    window.onresize = function () {
      let canvasDimensions = canvas.resize()
      Observable.callObservers('onCanvasResize', {
        'width': canvasDimensions.width,
        'height': canvasDimensions.height
      })
    }
  }
}