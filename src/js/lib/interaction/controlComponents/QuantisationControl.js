import './PlusMinusControl'
import PlusMinusControl from "./PlusMinusControl";

export default class QuantisationControl extends PlusMinusControl {

  constructor() {
    super([], 'quantisation', '')
    this.setValue(this.setup.system.audio.quantisation)
  }

  onPlus() {
    this.value++
    if (this.value > 256) {
      this.value = 256
    }
    return this.value
  }

  onMinus() {
    this.value--
    if (this.value <= 1) {
      this.value = 1
    }
    return this.value
  }

  onDoublePlus() {
    this.value *= 2
    if (this.value > 256) {
      this.value = 256
    }
    return this.value
  }

  onDoubleMinus() {
    this.value = Math.floor(this.value / 2)
    if (this.value <= 1) {
      this.value = 1
    }
    return this.value
  }
}