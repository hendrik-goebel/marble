/**
 * A checkBox styled as a switch.
 */
import BaseComponent from "./BaseComponent"

export default class SwitchControl extends BaseComponent {

  constructor(elementId, checked = true) {
    super()
    this.elementId = elementId
    this.checked = checked
    this.initElements()
    this.addChangeEvent()
    this.initListeners()
  }

  initElements() {
    this.elements = document.querySelectorAll('[data-id="' + this.elementId + '"]')
  }

  onChange() {
    this.checked = !this.checked
    if (this.checked) {
      for (let element of this.elements) {
        element.checked = true
      }
    } else {
      for (let element of this.elements) {
        element.checked = false
      }
    }
    return this.checked
  }

  addChangeEvent() {

    for (let element of this.elements) {
      element.onchange = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.elementId,
          'value': this.onChange()
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