/**
 * Routes Events to concrete methods
 */
export default class EventRouter {

  route() {
    this.controlsEvents()
    this.directorEvents()
    this.canvasEvents()
  }

  controlsEvents() {
    this.container.controls.Observable.addObserver((args) => {
      this.container.director.changeObjectProperty(args.entity, args.property, args.value)
      this.container.controls.updateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }

  canvasEvents() {
    this.container.canvas.Observable.addObserver((args) => {
      this.container.director.updateCanvasSize(args.width, args.height)
    }, 'onCanvasResize')

    this.container.director.Observable.addObserver((args) => {
      this.container.director.mouseDown(args.x, args.y)
    }, 'onMouseDown')

    this.container.director.Observable.addObserver((args) => {
      this.container.director.doubleClick(args.x, args.y)
    }, 'onDoubleClick')


    this.container.director.Observable.addObserver((args) => {
      this.container.director.singleClick(args.x, args.y)
    }, 'onSingleClick')

    this.container.director.Observable.addObserver((args) => {
      this.container.director.mouseMove(args.x, args.y)
    }, 'onMouseMove')

    this.container.director.Observable.addObserver((args) => {
      this.container.director.mouseUp(args.x, args.y)
    }, 'onMouseUp')

  }

  directorEvents() {

    this.container.director.Observable.addObserver((args) => {
      this.container.controls.updateControl(args.property, args.value)
    }, 'onSelectBar')

    if (this.setup.mode.test) {
      this.container.director.Observable.addObserver((args) => {
        this.container.collisionTest.next(this.container.director)
      }, 'onInit')

      this.container.director.Observable.addObserver((args) => {
        this.container.collisionTest.next(this.container.director)
      }, 'onCollision')
    }
  }

  /**
   * Audio Clocks can be created on runtime, so we have to assign events to the instances
   * @param audioClock
   */
  assignAudioClockEvents(audioClock) {
    audioClock.Observable.addObserver((args) => {
      this.container.audioDirector.onBeat(args.id)
    }, 'onBeat');
  }
}