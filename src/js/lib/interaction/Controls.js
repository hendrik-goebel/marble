import sounds from "../config/Sounds";

/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds, state) {
    this.controlItems = ['speed', 'bar-selected', 'bpm', 'note','instruments', 'metronome', 'metronome-instruments', 'barmoves']
    this.controls = {}
    this.sounds = sounds
    this.state = state
    for (let item of this.controlItems) {
      this.controls[item] = document.getElementById('control-' + item)
    }
    this.initControls()
    this.initInstrumentControls(sounds)
    this.listen()
  }

  initControls() {
    this.controls['bpm'].value = this.setup.system.audio.bpm
    this.controls['note'].value = this.setup.system.audio.note
    this.controls['bpm'].setAttribute("min", this.setup.system.audio.bpmMin)
    this.controls['bpm'].setAttribute("max", this.setup.system.audio.bpmMax)
    this.controls['metronome'].value = 1
    this.controls['barmoves'].value = 1
    this.controls['barmoves'].disabled = true
    console.log(this.controls)
  }

  initInstrumentControls(sounds) {
    for (let key in sounds) {
      let option = document.createElement("option");
      option.text = key
      option.value = key
      this.controls['instruments'].appendChild(option)
    }

    for (let key in sounds) {
      let option = document.createElement("option");
      option.text = key
      option.value = key
      this.controls['metronome-instruments'].appendChild(option)
    }
  }

  selectInstrument(key) {
    if (key == 'first') {
      for (let key in this.sounds) {
        this.controls['instruments'].value = key
        return
      }
    }
    this.controls['instruments'].value = key
  }

  updateBarMovesToggle() {

    if (this.state.activeBar) {
      this.controls.barmoves.disabled = false
    } else {
      this.controls.barmoves.checked = false
      this.controls.barmoves.disabled = true
      return
    }

    if (this.state.activeBar.fixed) {
      this.controls.barmoves.checked = false
    } else {
      this.controls.barmoves.checked = true
    }
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
    if (property == 'barSelected') {
      this.selectInstrument(value.sound)
      this.updateBarMovesToggle()
    }

    if (property == 'startDrawBar') {
      this.updateBarMovesToggle()
    }

    if (property == 'barUnselected') {
      this.updateBarMovesToggle()
    }

    if (property in this.controls) {
      this.controls[property].value = value
    }

    let propertyVariant = property + "-text"
    if (propertyVariant in this.controls) {
      this.controls[propertyVariant].value = value
    }
  }
}