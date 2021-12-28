/**
 * Routes Events to concrete methods
 */
export default class EventRouter {

  route() {
    this.directorEvents()
    this.canvasEvents()
    this.timerEvents()
    this.audioPlayerEvents()
    this.audioDirectorEvents()
  }

  audioPlayerEvents() {
    this.container.audioplayer.Observable.addObserver((args) => {
      this.container.directorTimer.run()
    }, 'onSoundsLoaded')
  }

  canvasEvents() {
    this.container.canvas.Observable.addObserver((args) => {
      this.container.director.onUpdateCanvasSize(args.width, args.height)
    }, 'onCanvasResize')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onMouseDown(args.x, args.y)
    }, 'onMouseDown')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onDoubleClick(args.x, args.y)
    }, 'onDoubleClick')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onSingleClick(args.x, args.y)
    }, 'onSingleClick')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onMouseMove(args.x, args.y)
    }, 'onMouseMove')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onMouseUp(args.x, args.y)
    }, 'onMouseUp')

    this.container.director.Observable.addObserver((args) => {
      this.container.directorUI.onKeyUp(args.key)
    }, 'onKeyUp')
  }

  directorEvents() {


    this.container.director.Observable.addObserver((args) => {
      this.container.directorAudio.onCollision(args)
    }, 'onCollision')

    if (this.setup.mode.test) {
      this.container.director.Observable.addObserver((args) => {
        this.container.collisionTest.next(this.container.director)
      }, 'onInit')

      this.container.director.Observable.addObserver((args) => {
        this.container.collisionTest.next(this.container.director)
      }, 'onCollision')
    }
  }

  audioDirectorEvents() {
  }

  timerEvents() {
    this.container.directorTimer.videoTimer.Observable.addObserver((args) => {
      this.container.director.onTick(args)
    }, 'onTick')

    this.container.directorTimer.videoTimer.Observable.addObserver((args) => {
      this.container.director.onBeat(args)
      this.container.directorAudio.onBeat(args)
    }, 'onBeat')
  }
}