/**
 * Routes Events to concrete methods
 */
export default class EventRouter {

  constructor(container, setup) {
    this.container = container
    this.setup = setup
  }

  route() {
    this.controlsEvents()
    this.directorEvents()
    this.canvasEvents()
  }



  controlsEvents() {
    let container = this.container
    container.controls.Observable.addObserver(function (args) {
      container.director.changeObjectProperty(args.entity, args.property, args.value)
      container.controls.updateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }

  canvasEvents() {
    let container = this.container
    container.canvas.Observable.addObserver(function (args) {
      container.director.updateCanvasSize(args.width, args.height)
    }, 'onCanvasResize')

    container.director.Observable.addObserver(function (args) {
      container.director.mouseDown(args.x, args.y)
    }, 'onMouseDown')

    container.director.Observable.addObserver(function (args) {
      container.director.doubleClick(args.x, args.y)
    }, 'onDoubleClick')


    container.director.Observable.addObserver(function (args) {
      container.director.singleClick(args.x, args.y)
    }, 'onSingleClick')


    container.director.Observable.addObserver(function (args) {
      container.director.mouseMove(args.x, args.y)
    }, 'onMouseMove')

    container.director.Observable.addObserver(function (args) {
      container.director.mouseUp(args.x, args.y)
    }, 'onMouseUp')

  }

  directorEvents() {
    let container = this.container
    let setup = this.setup

    container.director.Observable.addObserver(function (args) {
      container.controls.updateControl(args.property, args.value)
    }, 'onSelectBar')

    if (setup.mode.test) {
      container.director.Observable.addObserver(function (args) {
        container.collisionTest.next(container.director)
      }, 'onInit')

      container.director.Observable.addObserver(function (args) {
        container.collisionTest.next(container.director)
      }, 'onCollision')
    }
  }
}