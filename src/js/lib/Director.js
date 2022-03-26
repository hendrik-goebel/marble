/**
 * Takes care of state changes which are not caused by user interactions
 * State changes which are caused by user interactions are handeled by DirectorUserInteraction
 */

export default class Director {

  constructor(canvas, factory, collisionDetector, state, videoTimer) {
    this.canvas = canvas
    this.factory = factory
    this.collisionDetector = collisionDetector
    this.audio = null
    this.state = state
    this.videoTimer = videoTimer
    this.videoTimer.run()
    this.isPlaying = false
    this.initListeners()
  }

  init() {
    this.canvas.prepare()
    this.state.droppers.push(this.factory.createDropper(10, 10))
    this.Observable.callObservers('onInit', this)
  }

  reset() {
    this.state.droppers = []
    this.state.bars = []
    this.state.activeBar = null
    this.init()
  }

  tickVideo() {
    this.canvas.clear()
    this._doBarsLoop()
    this._doDroppersLoop()
    this._doBallsLoop()
    this.canvas.update()
  }

  _doBallsLoop() {
    for (let dropper of this.state.droppers) {
      let balls = dropper.balls
      for (let ball of balls) {
        if (ball.isVisible) {
          this.collisionDetector.detectCanvasBorderCollision(ball, this.getCanvasDimensions())
          if (ball.isColliding && ball.collision.object.type == this.CONST.TYPE.WALL && ball.collision.position == 'bottom') {
            ball.deactivate()
          }

          for (let bar of this.state.bars) {
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
    for (let bar of this.state.bars) {
      if (!bar.fixed && bar.isColliding) {
        bar.moveOnBallCollision();
        bar.uncollide();
      }
      this.canvas.addBar(bar)
    }
  }

  _doDroppersLoop() {
    for (let dropper of this.state.droppers) {
      if (dropper.isVisible) {
        this.canvas.addDropper(dropper)
      }
    }
  }

  changeObjectProperty(type, property, value) {
    if (type == this.const.TYPE.BALL) {
      if (this.setup.ball.hasOwnProperty(property)) {
        this.setup.ball[property] = value

        for (let dropper of this.state.droppers) {
          let balls = dropper.balls
          for (let ball of balls) {
            ball[property] = value
          }
        }
        this.factory.setup = this.setup
      }
    }
  }

  onUpdateCanvasSize(width, height) {
    this.setup.world.width = width
    this.setup.world.height = height
  }

  getCanvasDimensions() {
    return {
      'x': 0,
      'width': this.setup.world.width,
      'y': 0,
      'height': this.setup.world.height,
      'type': this.CONST.TYPE.WALL
    }
  }

  onTick() {
    this.tickVideo()
  }

  onMetronomeBeat(property, value) {
    if (value == 1) {
      for (let dropper of this.state.droppers) {
        dropper.dropBall()
      }
    }
  }

  onUpdateControl(property, value) {
    if (property == 'barmoves' && this.state.activeBar) {
      this.state.activeBar.fixed = !this.state.activeBar.fixed
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')

    this.Observable.addObserver((args) => {
      this.onTick(args.property, args.value)
    }, 'onTick')

    this.Observable.addObserver((args) => {
      this.onMetronomeBeat(args.property, args.value)
    }, 'onMetronomeBeat')

  }
}