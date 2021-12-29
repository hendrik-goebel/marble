/**
 * Routes Events to concrete methods. This is legacy.
 */
export default class EventRouter {

  route() {
    this.directorEvents()
    this.canvasEvents()
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
}