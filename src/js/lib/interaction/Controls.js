import sounds from "../config/Sounds";

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
    this.initInstrumentControls(sounds)
    this.listen()
  }

  initInstrumentButtons() {
    let $instrumentButtons = document.getElementsByClassName('instrument-button')

    let i = 0;
    for (let key in this.sounds) {
      if (i >= $instrumentButtons.length) {
        console.warn("More Instruments avaiable than buttons. A few instruments were not assigned.")
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
    this.state.note = this.setup.system.audio.note

    this.controls['metronome'].value = 1
    this.controls['barmoves'].value = 1
    this.controls['barmoves'].disabled = true

    this.displayElements['note'].textContent = this.state.note
    this.displayElements['speed'].textContent = this.state.speed
  }

  initInstrumentControls(sounds) {
    for (let key in sounds) {
      let option = document.createElement("option");
      option.text = key
      option.value = key
      this.controls['metronome-instruments'].appendChild(option)
    }
    this.selectInstrument('first')
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
    this.displayElements['note'].textContent = this.state.note
    this.displayElements['speed'].textContent = this.state.speed
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

      this.controls['speed-plus'].onclick = (event) => {
        this.state.speed++
        if (this.state.speed >= 250) {
          this.state.speed = 250
        }
        Observable.callObservers('onControlsUpdate', {property: 'speed-plus', value: this.state.speed})
      }
      this.controls['speed-double-plus'].onclick = (event) => {
        this.state.speed += 10
        if (this.state.speed >= 250) {
          this.state.speed = 250
        }
        Observable.callObservers('onControlsUpdate', {property: 'speed-plus', value: this.state.speed})
      }
      this.controls['speed-minus'].onclick = (event) => {
        this.state.speed--
        if (this.state.speed <= 5) {
          this.state.speed = 5
        }
        Observable.callObservers('onControlsUpdate', {property: 'speed-plus', value: this.state.speed})
      }
      this.controls['speed-double-minus'].onclick = (event) => {
        this.state.speed -= 10
        if (this.state.speed <= 5) {
          this.state.speed = 5
        }
        Observable.callObservers('onControlsUpdate', {property: 'speed-plus', value: this.state.speed})
      }


      this.controls['note-plus'].onclick = (event) => {
        this.state.note++
        if (this.state.note >= 128) {
          this.state.note = 124
        }
        Observable.callObservers('onControlsUpdate', {property: 'note-plus', value: this.state.note})
      }
      this.controls['note-minus'].onclick = (event) => {
        this.state.note--
        if (this.state.note <= 2) {
          this.state.note = 2
        }
        Observable.callObservers('onControlsUpdate', {property: 'note-minus', value: this.state.note})
      }
      this.controls['note-double-plus'].onclick = (event) => {
        this.state.note *= 2
        if (this.state.note >= 128) {
          this.state.note = 128
        }
        Observable.callObservers('onControlsUpdate', {property: 'note-plus', value: this.state.note})
      }
      this.controls['note-double-minus'].onclick = (event) => {
        this.state.note = Math.floor(this.state.note / 2)
        if (this.state.note <= 2) {
          this.state.note = 2
        }
        Observable.callObservers('onControlsUpdate', {property: 'note-minus', value: this.state.note})
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
    if (property === 'metronome') {
      $element = this.controls.metronome
      cssClass = 'metronome-playing'
    }

    $element.classList.add(cssClass)
    setTimeout(function () {
      $element.classList.remove(cssClass)
    }, 200)
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