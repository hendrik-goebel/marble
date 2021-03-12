/**
 * Decides how objects  interact with each other
 */
import AbstractBaseClass from "./AbstractBaseClass";

export default class Director extends AbstractBaseClass {

  constructor(setup, canvas, factory, collisionDetector) {
    super()
    this.setup = setup
    this.canvas = canvas
    this.factory = factory
    this.collisionDetector = collisionDetector
    this.droppers = []
    this.bars = []
    this.activeBar = null
    this.activeBall = null
    this.bars = []
  }

  init() {
    this.canvas.prepare()
    this.droppers.push(this.factory.createDropper(10, 10))
    this.droppers[0].dropBall()
  }

  tick() {
    this.canvas.clear()
    this._doDroppersLoop()
    this._doBallsLoop()
    this._doBarsLoop()
    this.canvas.update()
  }

  _doBallsLoop() {
    for (let dropper of this.droppers) {
      let balls = dropper.balls
      for (let ball of balls) {

        if (ball.isVisible) {
          this.activeBall = ball
          this.collisionDetector.detectCanvasBorderCollision(ball, this.getCanvasDimensions())
          for (let bar of this.bars) {

            if (bar.isVisible) {
              this.collisionDetector.detectObjectCollision(ball, bar)
            }
          }
          if (this.activeBar) {
            this.collisionDetector.detectObjectCollision(ball, this.activeBar)
          }

          ball.move()
          ball.uncollide()

          this.canvas.addBall(ball)
        }
      }
    }
  }

  _doBarsLoop() {
    if (this.activeBar) {
      this.canvas.addBar(this.activeBar)
    }
    for (let bar of this.bars) {
      this.canvas.addBar(bar)
    }
  }

  _doDroppersLoop() {
    for (let dropper of this.droppers) {
      if (dropper.isVisible) {
        this.canvas.addDropper(dropper)
      }
    }
  }

  debug() {
    debugger
  }

  changeObjectProperty(type, property, value) {
    if (type == 'ball') {
      if (this.setup.ball.hasOwnProperty(property)) {
        this.setup.ball[property] = value

        for (let dropper of this.droppers) {
          let balls = dropper.balls
          for (let ball of balls) {
            ball[property] = value
          }
        }

        this.factory.setup = this.setup
      }
    }
  }

  startDrawBar(x, y) {

    this.activeBar = this.factory.createBar(x, y)
  }

  drawBar(x, y) {
    this.activeBar.width = x - this.activeBar.x
    this.activeBar.height = y - this.activeBar.y
  }

  stopDrawBar(x, y) {
    this.activeBar.width = x - this.activeBar.x
    this.activeBar.height = y - this.activeBar.y

    this.bars.push(this.activeBar)

  }

  updateCanvasSize(width, height) {
    this.setup.world.width = width
    this.setup.world.height = height
  }

  getCanvasDimensions() {
    return {
      'x': 0,
      'width': this.setup.world.width,
      'y': 0,
      'height': this.setup.world.height,
      'type': 'canvas'
    }
  }

  updateCanvasEvent(type, x, y) {
    /**
     * TODO: can we do this wih indirect calls instead?
     */
    switch (type) {
      case 'startDrawBar':
        this.startDrawBar(x, y)
        break;
      case 'stopDrawBar':
        this.stopDrawBar(x, y)
        break;
      case 'drawingBar':
        this.drawBar(x, y)
    }
  }
}