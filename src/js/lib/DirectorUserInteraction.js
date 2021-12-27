/**
 * Takes care of all user interactions which change the state
 */
export default class DirectorUserInteraction {

  constructor(state, factory, collisionDetector) {
    this.state = state
    this.factory = factory
    this.collisionDetector = collisionDetector
  }

  startDrawBar(x, y) {
    let bar = this.factory.createBar(x, y)
    bar.sound = this.state.instrument
    this.state.addBar(bar)
    this.Observable.callObservers('onStartDrawBar', {'property': 'startDrawBar', 'value': bar})
  }

  drawBar(x, y) {
    if (this.editMode == this.CONST.MODE.DRAWING) {
      let bar = this.state.activeBar
      bar.width = x - bar.x
      bar.height = y - bar.y
    }
  }

  onSelectBar(bar) {
    this.state.selectBar(bar)
    this.Observable.callObservers('onSelectBar', {'property': 'barSelected', 'value': bar})
  }

  onUnselectActiveBar() {
    this.state.unselectActiveBar()
    this.Observable.callObservers('onUnselectBar', {'property': 'barUnselected', 'value': ''})
  }

  onDeleteBar(bar) {
    this.state.deleteBar(bar)
  }

  onDoubleClick(x, y) {
    if (this.clickedObject) {
      if (this.clickedObject.type = 'bar') {
        this.onDeleteBar(this.clickedObject)
      }
    }
  }

  onSingleClick(x, y) {
    if (this.editMode == this.CONST.MODE.START_DRAWING) {
      this.editMode = this.CONST.MODE.DRAWING
      this.startDrawBar(x, y)
    }
  }

  onMouseDown(x, y) {
    for (let bar of this.state.bars) {
      this.clickedObject = this.collisionDetector.detectClickCollision({'x': x, 'y': y}, bar)
      if (this.clickedObject) {
        this.onSelectBar(bar)
        this.editMode = this.CONST.MODE.MOVING
        bar.setOffset(x, y)
        return
      }
      this.editMode = this.CONST.MODE.START_DRAWING
    }
    if (this.state.activeBar) {
      this.onUnselectActiveBar()
    }

    this.editMode = this.CONST.MODE.START_DRAWING
  }

  onMouseMove(x, y) {
    if (this.editMode == this.CONST.MODE.MOVING) {
      this.state.activeBar.move(x, y)
    }

    if (this.editMode == this.CONST.MODE.DRAWING) {
      this.drawBar(x, y)
    }
  }

  onMouseUp(x, y,) {
    this.editMode = this.CONST.MODE.NONE
  }

  onKeyUp(key) {
    if (key == 'd') {
      debugger
    }
  }
}