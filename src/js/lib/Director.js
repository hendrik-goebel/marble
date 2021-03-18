/**
 * Decides how objects  interact with each other
 */

export default class Director {

  constructor(setup, canvas, factory, collisionDetector) {
    this.setup = setup
    this.canvas = canvas
    this.factory = factory
    this.collisionDetector = collisionDetector
    this.droppers = []
    this.bars = []
    this.activeBarIndex = null
    this.activeBall = null
    this.bars = []
    this.editMode = null
  }


  init() {
    this.canvas.prepare()
    this.droppers.push(this.factory.createDropper(10, 10))
    this.droppers[0].dropBall()
    this.Observable.callObservers('onInit', this)
  }

  reset() {
    this.droppers = []
    this.bars = []
    this.activeBar = null
    this.init()
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
              if (ball.isColliding) {
                this.Observable.callObservers('onCollision', ball)
              }
            }
          }
          ball.move()
          ball.uncollide()

          this.canvas.addBall(ball)
        }
      }
    }
  }

  _doBarsLoop() {

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

  get activeBar() {
    if (this.activeBarIndex != null) {
      return this.bars[this.activeBarIndex]
    }
    return null
  }

  set activeBar(bar) {
    this.activeBarIndex = this.bars.indexOf(bar)
  }

  startDrawBar(x, y) {
    let bar = this.factory.createBar(x, y)
    this.bars.push(bar)
    this.selectBar(bar)
  }

  drawBar(x, y) {
    if (this.editMode == 'drawingBar') {
      this.activeBar.width = x - this.activeBar.x
      this.activeBar.height = y - this.activeBar.y
    }
  }

  selectBar(bar) {
    if(this.activeBar) {
      this.activeBar.isSelected = false
    }
    bar.isSelected = true
    this.activeBar = bar
    this.Observable.callObservers('onSelectBar', {'property' : 'barSelected', 'value': bar.id})
  }

  mouseDown(x, y) {
    let collisionObject

    for (let bar of this.bars) {
      collisionObject = this.collisionDetector.detectClickCollision({'x': x, 'y': y}, bar)
      if (collisionObject) {
        this.selectBar(bar)
        this.editMode = 'movingBar'
        bar.setOffset(x, y)
        return
      }
    }

    this.editMode = 'drawingBar'
    this.startDrawBar(x, y)
  }

  mouseMove(x, y) {
    if (this.editMode == 'movingBar') {
      this.activeBar.move(x, y)
    }
  }

  mouseUp(x, y,) {
    this.editMode = 'nothing'
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