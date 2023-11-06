export default class State {
  constructor() {
    this.droppers = []
    this.bars = []
    this._activeBarIndex = -1
    this.editMode = ''
    this.instrument = 'first'
    this.metronomeInstrument = 'first'
    this.speed = 300
    this.bpm = 80
    this.note = 16
    this.noteMetronome = 1
    this.measure = 4
    this.isPlaying = false
    this.hasStarted = false
    this.noisyCollisionValue = 1
  }

  addBar(bar) {
    this.unselectActiveBar()
    bar.isSelected = true
    this.bars.push(bar)
    this.activeBar = bar
  }

  selectBar(bar) {
    this.unselectActiveBar()
    bar.isSelected = true
    this.activeBar=bar
  }

  get activeBar() {
    if ( this._activeBarIndex != -1) {
      return this.bars[this._activeBarIndex]
    }
    return null
  }

  set activeBar(bar) {
    this._activeBarIndex = this.bars.indexOf(bar)
  }

  unselectActiveBar() {
    if (this.activeBar) {
      this.activeBar.isSelected = false
    }
    this._activeBarIndex = -1
  }

  deleteBar(bar) {
    let index = this.bars.indexOf(bar)
    this.bars.splice(index, 1)
    if (index == this._activeBarIndex) {
      if (this.bars.length == 0) {
        this._activeBarIndex = 0
      } else {
        this._activeBarIndex = this.bars.length - 1
      }
    }
  }
}