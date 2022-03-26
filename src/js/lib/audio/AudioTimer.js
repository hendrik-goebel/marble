/**
 *  A clock which is relying on Datetime rather than js internal clock
 *  This is a better way for audio because the internal clock fluctuates extremely
 */
export default class Audiotimer {
  constructor() {
    this.init()
    this.initListeners()
  }

  init() {
    this._startTime = new Date().getTime();
    this._startTimeMetronome = this._startTime
    this.timeInterval = 0
    this.timeIntervalMetronome = 0
    this._time = 0
    this._timeMetronome = 0
    this.countMetronome = 0
    this.count = 1
    this.isRunning = false
  }

  calculateTimeout() {
    this._time += this.timeInterval;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this.timeInterval - this._diff
  }

  run() {
    const milisecondsPerMinute = 60000
    this.timeInterval = (milisecondsPerMinute / this.state.bpm * (this.state.measure / this.state.note))
    this.timeout = setTimeout(
      () => this.executeCallback(),
      this.calculateTimeout()
    )
  }

  calculateTimeoutMetronome() {
    this._timeMetronome += this.timeIntervalMetronome;
    this._diffMetronome = (new Date().getTime() - this._startTimeMetronome) - this._timeMetronome;
    return this.timeIntervalMetronome - this._diffMetronome
  }

  runMetronome() {
    const milisecondsPerMinute = 60000
    this.timeIntervalMetronome = (milisecondsPerMinute / this.state.bpm * (this.state.measure / this.state.noteMetronome))
    this.timeoutMetronome = setTimeout(
      () => this.executeCallbackMetronome(),
      this.calculateTimeoutMetronome()
    )
  }

  executeCallback() {
    if (!this.isRunning) {
      this.run()
      return
    }
    this.count++
    if (this.count > this.state.note) {
      this.count = 1
    }
    this.Observable.callObservers('onBeat', {property: 'beat', value: this.count})
    this.run()
  }

  executeCallbackMetronome() {
    if (!this.isRunning) {
      this.runMetronome()
      return
    }
    this.countMetronome++
    if (this.countMetronome > this.state.noteMetronome) {
      this.countMetronome = 1
    }
    this.Observable.callObservers('onMetronomeBeat', {property: 'beat', value: this.countMetronome})
    this.runMetronome()
  }

  onControlsUpdate(property, value) {
    if (property == 'speed') {
      this.state.bpm = value
    }

    if (property == 'quantisation') {
      this.init()
    }
    if (property == 'metronome-quantisation') {
      this.state.noteMetronome  = value
      this.init()
    }

    if (property == 'play') {
      if (value == true) {
        this.run()
      }
      this.isRunning = value
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onControlsUpdate(args.property, args.value)
    }, 'onControlsUpdate')
  }
}