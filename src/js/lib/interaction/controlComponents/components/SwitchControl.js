/**
 * A checkBox styled as a switch.
 */
import BaseComponent from "./BaseComponent"

export default class SwitchControl extends BaseComponent{

  constructor(elementId, checked=true) {
    super()
    this.elementId = elementId
    this.checked = checked
    this.initElements()
    this.addChangeEvent()
    this.initListeners()
  }

  initElements() {
    this.element = document.getElementById(this.elementId)
  }

  onChange() {
    this.checked = !this.checked
    if (this.checked) {
      this.element.checked = true
    } else {
      this.element.checked = false
    }
    return this.checked
  }

  addChangeEvent() {
    this.element.onchange = (event) => {
      this.Observable.callObservers('onControlsUpdate', {
        'property': this.elementId,
        'value': this.onChange()
      })
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