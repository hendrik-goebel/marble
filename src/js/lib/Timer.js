/**
 *  A clock which is relying on Datetime rather than js internal clock
 *  This is a better way for audio because the internal clock fluctuates extremely
 */
export default class Timer {
  constructor(id) {
    this.bpm = 120
    this.note = 4
    this.messure = 4
    this.resolution = 1
    this.id = id
    this._grid = null
    this._startTime = new Date().getTime();
    this._time = 0;
    this.timeout = null
    this.resolutionMulitplier = 1
    this.count = 1
  }

  calculateGrid() {
    return (1000 * 60) / (this.bpm * this.resolution * this.resolutionMulitplier * this.note / this.messure )
  }

  calculateTimeout() {
    this._time += this._grid;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this._grid - this._diff
  }

  run() {
    this._grid = this.calculateGrid()
    this.timeout = setTimeout(
      () => this.executeCallback()
      ,
      this.calculateTimeout()
    )
  }

  executeCallback() {

    this.Observable.callObservers('onBeat', {
      'id': this.id,
      'count': this.count
    })

    this.count++
    if (this.count > this.note) {
      this.count = 1
    }
    this.run()
  }
}