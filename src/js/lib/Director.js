export default class Director {
  constructor(setup, canvas, factory) {
    this.setup = setup
    this.canvas = canvas
    this.factory = factory
    this.balls = []
    this.droppers = []
    this._init()
  }

  _init() {
    this.canvas.prepare()
    this.balls.push(this.factory.createBall())
    this.droppers.push(this.factory.createDropper())
  }

  tick() {
    this.canvas.clear()
    this._doDroppersLoop()
    this._doBallsLoop()
    this.canvas.update()
  }

  _doBallsLoop() {
    for (let ball of this.balls) {
      ball.move()
      if (ball.y > this.setup.world.height) {
        ball.y = 0
      }
      if (ball.isVisible) {
        this.canvas.addBall(ball)
      }
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
        for (let ball of this.balls) {
          ball[property] = value
        }
        this.factory.setup = this.setup
      }
    }
  }

  updateCanvasSize(width, height) {
    this.setup.world.width = width
    this.setup.world.height = height
  }
}