/**
 *  A clock which is relying on Datetime rather than js internal clock
 *  This is a better way for audio because the internal clock fluctuates extremely
 */
export default class Timer {
  constructor(id, label) {
    this.id = id
    this.label = label
    this.bpm =  this.setup.system.audio.bpm
    this.note =  this.setup.system.audio.note
    this._startTime = new Date().getTime();
    this.timeInterval = 0
    this._time = 0;
    this.count = 1
    this.timeout = 0
  }

  applySetup(setup) {
    for (let key in setup) {
      if (this.hasOwnProperty(key)) {
        this[key] = setup[key]
      }
    }
  }

  /**
   * Calculates the time interval in milliseconds based on bpm and note value
   * @returns {number}
   */
  calculateTimeInterval(bpm, note) {
    const milisecondsPerMinute = 60000
    return ((milisecondsPerMinute / bpm)  / note) * 4
  }

  calculateTimeout() {
    this._time += this.timeInterval;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this.timeInterval - this._diff
  }

  run() {
    this.timeInterval = this.calculateTimeInterval(this.bpm, this.note)
    this.timeout = setTimeout(
      () => this.executeCallback()
      ,
      this.calculateTimeout()
    )
  }

  executeCallback() {
    this.Observable.callObservers('onBeat', this)

    this.count++
    if (this.count > this.note) {
      this.count = 1
    }
    this.run()
  }
}