/**
 * A Canvas paints objects
 */
export default class Canvas {

  constructor(createjs) {
    this.createjs = createjs
    this.stage = new this.createjs.Stage("canvas");


  }

  addBall(ball) {
    let circle = new this.createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, ball.radius);
    circle.x = ball.x;
    circle.y = ball.y;
    this.stage.addChild(circle);
  }

  addDropper(dropper) {
    let circle = new this.createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, dropper.radius);
    circle.x = dropper.x;
    circle.y = dropper.y;
    this.stage.addChild(circle);
  }

  clear() {
    this.stage.removeAllChildren();
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
}