/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor() {
    this.controlItems = ['speed', 'bar-selected', 'bpm', 'bpm-text', 'note', 'note-text']
    this.controls = {}
    for (let item of this.controlItems) {
      this.controls[item] = document.getElementById('control-' + item)
    }
    this.initControls()
    this.listen()
  }

  initControls() {
    this.controls['speed'].value = this.setup.ball.speed
    this.controls['bpm'].value = this.setup.system.audio.bpm
    this.controls['bpm-text'].value = this.setup.system.audio.bpm
    this.controls['note'].value = this.setup.system.audio.note
    this.controls['note-text'].value = this.setup.system.audio.note
    this.controls['bpm'].setAttribute("min", this.setup.system.audio.bpmMin)
    this.controls['bpm'].setAttribute("max", this.setup.system.audio.bpmMax)

  }

  listen() {
    let Observable = this.Observable
    for (let item of this.controlItems) {
      if (!this.controls[item]) {
        continue
      }
      this.controls[item].onchange = function (input) {
        Observable.callObservers(
          'onControlsUpdate',
          {
            'property': item,
            'value': this.value
          })
      }
    }
  }

  updateControl(property, value) {
    if (property in this.controls) {
      this.controls[property].value = value
    }

    let propertyVariant = property + "-text"
    if (propertyVariant in this.controls) {
      this.controls[propertyVariant].value = value
    }
  }

}