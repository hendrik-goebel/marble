/**
 *  A clock which is relying on Datetime rather than js internal clock
 *  This is a better way for audio because the internal clock fluctuates extremely
 */
export default class VideoTimer {
  constructor(id, label) {
    this.id = id
    this.label = label
    this._startTime = new Date().getTime();
    this.timeInterval = 0
    this._time = 0
    this.count = 0
    this.timeout = 0
    this.initListeners()
  }

  /**
   * Calculates the time interval in milliseconds based on bpm and note value
   * @returns {number}
   */
  calculateTimeInterval() {
    const milisecondsPerMinute = 60000
    let result = (milisecondsPerMinute / this.state.bpm * (this.state.measure / this.state.note)) / 5

    return 16
  }

  calculateTimeout() {
    this._time += this.timeInterval;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this.timeInterval - this._diff
  }

  run() {
    this.timeInterval = this.calculateTimeInterval()
    this.timeout = setTimeout(
      () => this.executeCallback()
      ,
      this.calculateTimeout()
    )
  }

  executeCallback() {
    this.count++
    if (this.count > this.state.note) {
      this.count = 1
    }
    this.Observable.callObservers('onTick', {property: 'tick', value: this.count})
    this.run()
  }

  onControlsUpdate(property, value) {
    if (property == 'speed') {
      this.state.bpm = value
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onControlsUpdate(args.property, args.value)
    }, 'onControlsUpdate')
  }
}