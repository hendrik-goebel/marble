/**
 * Switch to turn metronome off and on
 */
export default class ActiveInstrumentDisplay {

  constructor() {
    this.elementId = 'active-instrument';
    this.initElements()
    this.initListeners()
    this.onUpdateControl()
  }

  initElements() {
    this.elements = document.querySelectorAll('[data-id="' + this.elementId + '"]')
  }

  updateDisplay(value) {
    for (let element of this.elements) {
      element.textContent = value
    }
  }

  onUpdateControl(property, item) {
    if (property == 'instrument-button') {
      for (let element of this.elements) {
        this.updateDisplay(item)
      }
    }
    if (property == 'barSelected') {
      for (let element of this.elements) {
        this.updateDisplay(item.sound)
      }
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')

    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onSelectBar')
  }
}