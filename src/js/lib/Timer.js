export default class Timer {
  constructor() {
    this.initListeners()
    this.isPlaying = false
    this.init()
  }

  init() {

  }

  get interval() {
  }

  tick() {
  }

  run() {
    this.isPlaying = true
    this.expected = Date.now() + this.interval;
    setTimeout(this.step.bind(this), this.interval);
  }

  countStep() {

  }

  step() {
    if (this.isPlaying == false) {
      return;
    }
    this.countStep()

    let delta = Date.now() - this.expected;
    if (delta > this.interval) {
      console.warn('Timer drift of ' + delta + 'ms');
    }
    this.tick()
    this.expected += this.interval;
    setTimeout(this.step.bind(this), Math.max(0, this.interval - delta)); // take into account drift
  }

  onControlsUpdate(property, value) {
    if (property == 'play') {
      if (value == true) {
        this.run()
      } else {
        this.isPlaying = false
      }
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onControlsUpdate(args.property, args.value)
    }, 'onControlsUpdate')
  }
}