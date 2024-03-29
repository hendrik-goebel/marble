import Timer from '../Timer'

export default class MetronomeTimer extends Timer {
  milisecondsPerMinute = 60000

  get interval() {
    return (this.milisecondsPerMinute / this.state.bpm) * (this.state.measure / this.state.noteMetronome)
  }

  init() {
    this.count = 0
  }

  countStep() {
    this.count++
    if (this.count > this.state.noteMetronome) {
      this.count = 1
    }
  }

  tick() {
      this.Observable.callObservers('onMetronomeBeat', {property: 'beat', value: this.count})
  }

  onControlsUpdate(property, value) {

    if (property == 'play') {
      if (value == true) {
        this.run()
      } else {
        this.isPlaying = false
      }
    }

    if (property == 'speed') {
      this.state.bpm = value
    }

    if (property == 'metronome-quantisation') {
      this.state.noteMetronome = value
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onControlsUpdate(args.property, args.value)
    }, 'onControlsUpdate')
  }
}