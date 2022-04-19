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
}