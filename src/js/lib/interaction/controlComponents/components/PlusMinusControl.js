/**
 * A plus button, a minus button and a display showing the current
 * optionally also double plus and double minus buttons
 * value in between
 */
export default class PlusMinusControl {

  constructor(items, elementId, value = 'first') {
    this.displayElementId = elementId
    this.plusElementId = elementId + '-plus'
    this.minusElementId = elementId + '-minus'
    this.doublePlusElementId = elementId + '-double-plus'
    this.doubleMinusElementId = elementId + '-double-minus'

    this.items = items
    if (value == 'first') {
      this.value = Object.keys(this.items)[0]
    }
    this.initElements()
    this.addPlusEvent()
    this.addMinusEvent()
    if (this.doublePlusElements) {
      this.addDoublePlusEvent()
    }
    if (this.doubleMinusElements) {
      this.addDoubleMinusEvent()
    }
    this.updateDisplay()
    this.initListeners()
  }

  initElements() {
    this.displayElements = document.querySelectorAll('[data-id="' + this.displayElementId + '"]')
    this.plusElements = document.querySelectorAll('[data-id="' + this.plusElementId + '"]')
    this.minusElements = document.querySelectorAll('[data-id="' + this.minusElementId + '"]')
    this.doublePlusElements = document.querySelectorAll('[data-id="' + this.doublePlusElementId + '"]')
    this.doubleMinusElements = document.querySelectorAll('[data-id="' + this.doubleMinusElementId + '"]')
  }

  setValue(value) {
    if (value == 'first') {
      this.value = Object.keys(this.items)[0]
    }
    this.value = value
    this.updateDisplay()
  }

  updateDisplay() {
    for (let displayElement of this.displayElements) {
      displayElement.textContent = this.value
    }
  }

  onPlus() {
    return this.getNext()
  }

  onDoublePlus() {
    console.warn("Double plus event listener not implemented.")
    return this.value
  }

  addPlusEvent() {
    for (let plusElement of this.plusElements) {
      plusElement.onclick = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.displayElementId,
          'value': this.onPlus()
        })
      }
    }
  }

  onMinus() {
    return this.getPrevious()
  }

  onDoubleMinus() {
    console.warn("Double minus event listener not implemented.")
    return this.value
  }

  addMinusEvent() {
    for (let minusElement of this.minusElements) {
      minusElement.onclick = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.displayElementId,
          'value': this.onMinus()
        })
      }
    }
  }

  addDoublePlusEvent() {
    for (let doublePlusElement of this.doublePlusElements) {
      doublePlusElement.onclick = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.displayElementId,
          'value': this.onDoublePlus()
        })
      }
    }
  }

  addDoubleMinusEvent() {
    for (let doubleMinusElement of this.doubleMinusElements) {
      doubleMinusElement.onclick = (event) => {
        this.Observable.callObservers('onControlsUpdate', {
          'property': this.displayElementId,
          'value': this.onDoubleMinus()
        })
      }
    }
  }

  getNext() {
    let keys = Object.keys(this.items)
    let index = keys.indexOf(this.value)

    if (index >= keys.length - 1) {
      this.value = keys[0]
      return this.value
    }
    this.value = keys[index + 1]
    return this.value
  }

  getPrevious() {
    let keys = Object.keys(this.items)
    let index = keys.indexOf(this.value)
    if (index === 0) {
      this.value = keys[keys.length - 1]
      return this.value
    }

    this.value = keys[index - 1]
    return this.value
  }

  onUpdateControl(property, value) {
    if (property == this.displayElementId) {
      this.setValue(value)
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }
}