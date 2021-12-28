/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds) {

  }

  getInstrumentButtonBySound(sound) {
    if (sound === 'first') {
      return this.controlsInstrumentButtons[0]
    }
    for (let $instrumentButton of this.controlsInstrumentButtons) {
      if ($instrumentButton.dataset.sound === sound) {
        return $instrumentButton
      }
    }
    return null
  }

  getFirstSound() {
    for (let key in this.sounds) {
      return key
    }
  }

  selectInstrument(key) {
    let sound = key
    if (key === 'first') {
      sound = this.getFirstSound()
    }

    this.updateInstrumentDisplay(sound)
    this.updateInstrumentButtonDisplay(key)
  }

  updateInstrumentDisplay(key) {
    let sound = key
    if (key === 'first') {
      sound = this.getFirstSound()
    }
 //   this.displayElements['active-instrument'].textContent = sound
  }

  updateDisplayElements() {
  }

  updateInstrumentButtonDisplay(key) {
    let sound = key
    if (key === 'first') {
      sound = this.getFirstSound()
    }
    for (let index in this.controlsInstrumentButtons) {
      let button = this.controlsInstrumentButtons[index]
      if (button.dataset.sound === sound) {
        button.classList.add('btn-selected')
        button.focus()
      } else {
        button.classList.remove('btn-selected')
        button.blur()
      }
    }
  }



  listen() {
    let Observable = this.Observable
    for (const id in this.controls) {
      let item = this.controls[id]

      item.onchange = function () {
        Observable.callObservers(
          'onControlsUpdate',
          {
            'property': id,
            'value': this.value
          })
      }


    }
  }



  onUpdateControl(property, value) {
    if (property === 'barSelected') {
      this.selectInstrument(value.sound)
      this.updateInstrumentDisplay(value.sound)
      this.updateInstrumentButtonDisplay(value.sound)
    }

    if (property === 'startDrawBar') {
      this.updateInstrumentDisplay(value.sound)
    }

    if (property === 'barUnselected') {
    }

    if (property === 'instruments') {
      if (this.state.activeBar) {
        this.updateInstrumentDisplay(value)
      }
    }

    if (property === 'instruinstrumentButton') {
      this.updateInstrumentButtonDisplay(value)
      this.updateInstrumentDisplay(value)
    }

    if (property in this.controls) {
      this.controls[property].value = value
    }

    let propertyVariant = property + "-text"
    if (propertyVariant in this.controls) {
      this.controls[propertyVariant].value = value
    }
    this.updateDisplayElements()
  }
}