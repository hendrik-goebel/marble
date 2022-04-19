import Timer from '../Timer'

export default class Audiotimer extends Timer {
  milisecondsPerMinute = 60000

  get interval() {
    return (this.milisecondsPerMinute / this.state.bpm * (this.state.measure / this.state.note))
  }

  init() {
    this.count = 1
  }

  countStep() {
    this.count++
    if (this.count > this.state.note) {
      this.count = 1
    }
  }

  tick() {
      this.Observable.callObservers('onBeat', {property: 'beat', value: this.count})
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