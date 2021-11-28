import PlusMinusControl from "./components/PlusMinusControl";

export default class SpeedControl extends PlusMinusControl {

  constructor() {
    super([], 'speed', '')
    this.setValue(this.setup.system.audio.bpm)
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
    this.value += 10
    if (this.value > 256) {
      this.value = 256
    }
    return this.value
  }

  onDoubleMinus() {
    this.value -= 10
    if (this.value <= 1) {
      this.value = 1
    }
    return this.value
  }
}