import PlusMinusControl from "./components/PlusMinusControl";

export default class NoisyCollisionControl extends PlusMinusControl {

  constructor(maxCollisionCount) {
    super([], 'noisy-collision');
    this.maxCollisionCount = maxCollisionCount;
    this.setValue(1)
  }

  onPlus() {
    this.value++
    if (this.value > this.maxCollisionCount ) {
      this.value = 1
    }
    return this.value
  }

  onMinus() {
    this.value--
    if (this.value <= 1) {
      this.value = this.maxCollisionCount
    }
    return this.value
  }

  onUpdateControl(property, value) {
    if (property != 'noisy-collision') {
      return
    }
    this.setValue(value)
  }

  onSelectBar(property, bar)
  {
    this.setValue(bar.noisyCollisionValue)
  }

  onStartDrawBar(property, bar)
  {
    this.setValue(bar.noisyCollisionValue)
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')

    this.Observable.addObserver((args) => {
      this.onSelectBar(args.property, args.value)
    }, 'onSelectBar')

    this.Observable.addObserver((args) => {
      this.onStartDrawBar(args.property, args.value)
    }, 'onStartDrawBar')
  }
}