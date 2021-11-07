/**
 * A plus button, a minus button and a display showing the current value in between
 */
export default class PlusMinusControl {

  constructor(items, elementId, defaultKey='first') {
    this.displayElementId = elementId
    this.plusElementId = elementId + '-plus'
    this.minusElementId = elementId + '-minus'

    this.items = items

    this.currentItemKey = defaultKey
    if (defaultKey == 'first') {
      this.currentItemKey = Object.keys(this.items)[0]
    }
    this.initElements()
    this.addPlusEvent()
    this.addMinusEvent()
    this.updateDisplay()
    this.initListeners()
  }

  initElements() {
    this.displayElement = document.getElementById(this.displayElementId)
    this.plusElement = document.getElementById(this.plusElementId)
    this.minusElement = document.getElementById(this.minusElementId)
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentItemKey
  }

  addPlusEvent() {
    this.plusElement.onclick = (event) => {
      this.Observable.callObservers('onControlsUpdate', {
        'property': this.displayElementId ,
        'value': this.getNextItemKey()
      })
    }
  }

  addMinusEvent() {
    this.minusElement.onclick = (event) => {
      this.Observable.callObservers('onControlsUpdate', {
        'property': this.displayElementId,
        'value': this.getPreviousItemKey()
      })
    }
  }

  getNextItemKey() {
    let keys = Object.keys(this.items)
    let index = keys.indexOf(this.currentItemKey)

    if (index >= keys.length -  1) {
      this.currentItemKey = keys[0]
      return this.currentItemKey
    }
    this.currentItemKey = keys[index + 1]
    return this.currentItemKey
  }

  getPreviousItemKey() {
    let keys = Object.keys(this.items)
    let index = keys.indexOf(this.currentItemKey)
    if (index === 0) {
      this.currentItemKey = keys[keys.length - 1]
      return this.currentItemKey
    }

    this.currentItemKey = keys[index - 1]
    return this.currentItemKey
  }

  onUpdateControl(property, itemKey) {
    if (property == this.displayElementId) {
      this.currentItemKey = itemKey
      this.updateDisplay()
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }
}