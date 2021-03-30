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

  }

  drawBar(x, y) {
    if (this.editMode == this.CONST.MODE.DRAWING) {
      let bar = this.state.activeBar
      bar.width = x - bar.x
      bar.height = y - bar.y
    }
  }

  selectBar(bar) {
    this.state.selectBar(bar)
    this.Observable.callObservers('onSelectBar', {'property': 'barSelected', 'value': bar})
  }

  unselectActiveBar() {
    this.state.unselectActiveBar()
  }

  deleteBar(bar) {
   this.state.deleteBar(bar)
  }

  doubleClick(x, y) {
    if (this.clickedObject) {
      if (this.clickedObject.type = 'bar') {
        this.deleteBar(this.clickedObject)
      }
    }
  }

  singleClick(x, y) {
    if (this.editMode ==  this.CONST.MODE.START_DRAWING) {
      this.editMode = this.CONST.MODE.DRAWING
      this.startDrawBar(x, y)
    }
  }

  mouseDown(x, y) {
    for (let bar of this.state.bars) {
      this.clickedObject = this.collisionDetector.detectClickCollision({'x': x, 'y': y}, bar)
      if (this.clickedObject) {
        this.selectBar(bar)
        this.editMode = this.CONST.MODE.MOVING
        bar.setOffset(x, y)
        return
      }
      this.editMode = this.CONST.MODE.START_DRAWING
    }
    this.unselectActiveBar()
    this.editMode = this.CONST.MODE.START_DRAWING
  }

  mouseMove(x, y) {
    if (this.editMode == this.CONST.MODE.MOVING) {
      this.state.activeBar.move(x, y)
    }

    if (this.editMode == this.CONST.MODE.DRAWING) {
      this.drawBar(x, y)
    }
  }

  mouseUp(x, y,) {
    this.editMode = this.CONST.MODE.NONE
  }

  onKeyUp(key) {
    if (key == 'd') {
      debugger
    }
  }

  onUpdateControl(property, value) {
    if (property == 'instruments') {
      this.state.instrument = value

      if (this.state.activeBar) {
        this.state.activeBar.sound = value
      }
    }
  }
}