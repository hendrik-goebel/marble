/**
 *  A clock which is relying on Datetime rather than js internal clock
 *  This is a better way for audio because the internal clock fluctuates extremly
 */
export default class AudioClock {
  constructor(id) {
    this.bpm = 120
    this.resolution = 1
    this.id = id
    this.level = 1
    this._grid = null
    this._startTime = new Date().getTime();
    this._time = 0;
  }

  calculateGrid() {
    return (1000 * 60) / (this.bpm * this.resolution)
  }

  calculateTimeout() {
    this._time += this._grid;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this._grid - this._diff
  }

  run() {
    this._grid = this.calculateGrid()
    setTimeout(
      () => this.executeCallback()
      ,
      this.calculateTimeout()
    )
  }

  executeCallback() {

    this.Observable.callObservers('onBeat', {'id': this.id})
    this.run()
  }
}