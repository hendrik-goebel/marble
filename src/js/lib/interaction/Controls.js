import sounds from "../config/Sounds";

/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds, state) {
    this.controlItems = ['speed', 'bar-selected', 'bpm', 'note', 'metronome', 'metronome-instruments', 'barmoves', 'active-instrument']
    this.controls = {}
    this.controlsInstrumentButtons = null
    this.sounds = sounds
    this.state = state
    this.buildInstrumentButtons()
    this.getControlElements()


    this.initControls()
    this.initInstrumentControls(sounds)
    this.listen()
  }

  getControlElements() {
    for (let item of this.controlItems) {
      this.controls[item] = document.getElementById('control-' + item)
    }

    this.controlsInstrumentButtons = [].slice.call(document.getElementsByClassName('instrument-button'));
  }

  buildInstrumentButtons() {
    let $instrumentButtonContainer = document.getElementById('instrument-buttons-container')
    let $instrumentButtonTemplate = document.getElementById('instrument-button-template')
    for (let key in this.sounds) {
      let $instrumentButton = $instrumentButtonTemplate.cloneNode()
      $instrumentButton.removeAttribute('id')
      $instrumentButton.setAttribute('data-sound', key)
      $instrumentButton.setAttribute('title', key)
      $instrumentButtonContainer.appendChild($instrumentButton)
    }
    $instrumentButtonTemplate.parentNode.removeChild($instrumentButtonTemplate)
  }

  initControls() {
    this.controls['bpm'].value = this.setup.system.audio.bpm
    this.controls['note'].value = this.setup.system.audio.note
    this.controls['bpm'].setAttribute("min", this.setup.system.audio.bpmMin)
    this.controls['bpm'].setAttribute("max", this.setup.system.audio.bpmMax)
    this.controls['metronome'].value = 1
    this.controls['barmoves'].value = 1
    this.controls['barmoves'].disabled = true

  }

  initInstrumentControls(sounds) {

    for (let key in sounds) {
      let option = document.createElement("option");
      option.text = key
      option.value = key
      this.controls['metronome-instruments'].appendChild(option)
    }

    this.updateInstrumentDisplay()
    this.updateInstrumentButtonDisplay()
  }

  getFirstSound() {
    for (let key in this.sounds) {
      return key
    }
  }

  selectInstrument(key) {
    let sound = key
    if (key == 'first') {
      sound = this.getFirstSound()
    }

    this.updateInstrumentDisplay(sound)
  }

  updateInstrumentDisplay(key) {
    let sound = key
    if (key == 'first') {
      sound = this.getFirstSound()
    }
    this.controls['active-instrument'].textContent = sound
  }

  updateInstrumentButtonDisplay(key) {

    let sound = key
    if (!key) {
      sound = this.getFirstSound()
    }
    for (let index in this.controlsInstrumentButtons) {
      let button = this.controlsInstrumentButtons[index]
      if (button.dataset.sound == sound) {
        button.classList.add('btn-selected')
        button.focus()
      } else {
        button.classList.remove('btn-selected')
      }
    }
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
      for (let button of this.controlsInstrumentButtons) {
        button.onclick = (event) => {
          Observable.callObservers(
            'onControlsUpdate',
            {
              'property': 'instrumentButton',
              'value': event.target.dataset.sound
            })
        }
      }
    }
  }

  updateControl(property, value) {

    if (property == 'barSelected') {
      this.selectInstrument(value.sound)
      this.updateBarMovesToggle()
      this.updateInstrumentDisplay(value.sound)
      this.updateInstrumentButtonDisplay(value.sound)
    }

    if (property == 'startDrawBar') {
      this.updateBarMovesToggle()
      this.updateInstrumentDisplay(value.sound)
    }

    if (property == 'barUnselected') {
      this.updateBarMovesToggle()
      this.updateInstrumentDisplay()
    }

    if (property == 'instruments') {
      if (this.state.activeBar) {
        this.updateInstrumentDisplay(value)
      }
    }

    if (property == 'instrumentButton') {
      this.updateInstrumentButtonDisplay(value)
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