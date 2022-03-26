/**
 * A simple button
 */
export default class PlayButtonControl  {

  constructor(elementId, state) {
    this.elementId = 'play'
    this.state = false
    this.initElements()
    this.addChangeEvent()
    this.initListeners()
  }

  initElements() {
    this.elements = document.querySelectorAll('[data-id="' + this.elementId + '"]')
  }

  onClick() {
    this.state = !this.state
    return this.state
  }

  enable() {
    for (let element of this.elements) {
      element.disabled = false
    }
  }

  disable() {
    for (let element of this.elements) {
      element.disabled = true
    }
  }


  addChangeEvent() {
    for (let element of this.elements) {
      element.onclick = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.elementId,
          'value': this.onClick()
        })
      }
    }
  }

  onUpdateControl(property, value) {

  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }
}