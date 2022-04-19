/**
 * Takes care of state changes which are not caused by user interactions
 * State changes which are caused by user interactions are handled by DirectorUserInteraction
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
    this.isPLaying = false
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
        let lastBarCollisionId = null
        if (ball.isVisible) {
          if (ball.collision.object !== null) {
            lastBarCollisionId = ball.collision.object.id
          }
          this.collisionDetector.detectCanvasBorderCollision(ball, this.getCanvasDimensions())

          // Collision with below wall makes the ball disappear
          if (ball.isColliding && ball.collision.object.type == this.CONST.TYPE.WALL && ball.collision.position == 'bottom') {
            let index = balls.indexOf(ball)
            balls.splice(index, 1)
            ball = null
            continue
          }
          if (this.isPLaying) {
            ball.move()
          }
          for (let bar of this.state.bars) {
            if (bar.isVisible) {
              this.collisionDetector.detectObjectCollision(ball, bar)
              if (ball.isColliding && ball.collision.object.id == bar.id) {
                if (lastBarCollisionId === ball.collision.object.id) {
                  continue
                }
                lastBarCollisionId = ball.collision.object.id
                bar.increaseCollisionCounter();
                this.Observable.callObservers('onCollision', ball)
                if (bar.isNoisyCollision) {
                  this.Observable.callObservers('onNoisyCollision', ball)
                }
              }
            }
          }
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

  onBeat(property, value) {
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
    if (property == 'noisy-collision' && this.state.activeBar) {
      this.state.activeBar.noisyCollisionValue = value
    }
    if (property == 'play') {
      this.isPLaying = value
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