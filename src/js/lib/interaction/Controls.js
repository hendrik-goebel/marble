import sounds from "../config/Sounds";

/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds, state) {
    this.controlItems = ['speed', 'bar-selected', 'bpm', 'bpm-text', 'note', 'note-text', 'instruments', 'metronome', 'metronome-instruments', 'barfixed']
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
    this.controls['bpm-text'].value = this.setup.system.audio.bpm
    this.controls['note'].value = this.setup.system.audio.note
    this.controls['note-text'].value = this.setup.system.audio.note
    this.controls['bpm'].setAttribute("min", this.setup.system.audio.bpmMin)
    this.controls['bpm'].setAttribute("max", this.setup.system.audio.bpmMax)
    this.controls['metronome'].value = 1
    this.controls['barfixed'].value = 1
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

  updateBarFixedToggle() {

    if (this.state.activeBar) {
      this.controls.barfixed.disabled = false
    } else {
      this.controls.barfixed.checked = false
      this.controls.barfixed.disabled = true
      return
    }

    if (this.state.activeBar.fixed) {
      this.controls.barfixed.checked = true
    } else {
      this.controls.barfixed.checked = false
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
      this.updateBarFixedToggle()
    }

    if (property == 'startDrawBar') {
      this.updateBarFixedToggle()
    }

    if (property == 'barUnselected') {
      this.updateBarFixedToggle()
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