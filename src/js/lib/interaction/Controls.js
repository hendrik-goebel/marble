/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(sounds) {
    this.controls = {}
    this.displayElements = {}
    this.controlsInstrumentButtons = []
    this.sounds = sounds

    this.initElements()
    this.setDefaultValues()
    this.initInstrumentButtons()
    this.listen()
  }

  initInstrumentButtons() {
    let $instrumentButtons = document.getElementsByClassName('instrument-button')

    let i = 0;
    for (let key in this.sounds) {
      if (i >= $instrumentButtons.length) {
        console.warn("More Instruments available than buttons. A few instruments were not assigned.")
        return;
      }
      let $instrumentButton = $instrumentButtons[i]
      $instrumentButton.setAttribute('data-sound', key)
      $instrumentButton.setAttribute('title', key)
      $instrumentButton.disabled = false
      this.controlsInstrumentButtons.push($instrumentButton)
      i++;
    }
  }

  /**
   * A control element is an ui element of the top area.
   * to be recognized it needs to have the class "control" and an id
   * which corresponds with the internal id used in the application code.
   *
   * A display element displays dynamicly a value. It needs the class "display"
   */
  initElements() {

    let displayElements = document.getElementsByClassName('display')
    for (const element of displayElements) {
      let id = element.getAttribute('id')
      if (!id) {
        console.warn('display element without id: ', element)
        continue
      }
      this.displayElements[id] = element;
    }

    let controlElements = document.getElementsByClassName('control')
    for (const control of controlElements) {
      let id = control.getAttribute('id')
      if (!id) {
        console.warn('Control element without id: ' + control.textContent)
        continue
      }
      this.controls[id] = control;
    }
  }

  setDefaultValues() {
    this.controls['barmoves'].value = 1
    this.controls['barmoves'].disabled = true
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
    this.displayElements['active-instrument'].textContent = sound
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

  onStartPlaySound(property, value) {
    let $element
    let cssClass
    if (property === 'bar') {
      $element = this.getInstrumentButtonBySound(value)
      cssClass = 'button-playing'
    }
  }

  onUpdateControl(property, value) {
    if (property === 'barSelected') {
      this.selectInstrument(value.sound)
      this.updateBarMovesToggle()
      this.updateInstrumentDisplay(value.sound)
      this.updateInstrumentButtonDisplay(value.sound)
    }

    if (property === 'startDrawBar') {
      this.updateBarMovesToggle()
      this.updateInstrumentDisplay(value.sound)
    }

    if (property === 'barUnselected') {
      this.updateBarMovesToggle()
    }

    if (property === 'instruments') {
      if (this.state.activeBar) {
        this.updateInstrumentDisplay(value)
      }
    }

    if (property === 'instrumentButton') {
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