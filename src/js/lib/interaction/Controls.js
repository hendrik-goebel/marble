import sounds from "../config/Sounds";

/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds) {
    this.controlItems = ['speed', 'bar-selected', 'bpm', 'bpm-text', 'note', 'note-text', 'instruments', 'metronome']
    this.controls = {}
    this.sounds = sounds
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
  }

  initInstrumentControls(sounds) {
    for (let key in sounds.samples) {
      let sound = sounds.samples[key]

      let option = document.createElement("option");
      option.text = sound.name
      option.value = sound.name
      this.controls['instruments'].appendChild(option)
    }
  }

  selectInstrument(key) {
    if (key =='first') {

      this.controls['instruments'].value = this.sounds.samples[0].name

    }
    this.controls['instruments'].value = key

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