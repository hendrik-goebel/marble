import Timer from "./Timer.js"

export default class VideoTimer extends Timer {


  constructor(id, label) {
    super();
    this.id = id
    this.label = label
    this.bpmMin = this.setup.system.audio.bpmMin
    this.bpmMax = this.setup.system.audio.bpmMax
    this.videoScallingFactor= 100
    this.baseTickTime = this.setup.system.video.baseTickTime
   // this.scallingFactor = this.setup.system.video.scallingFactor
    this.maxNote = 32
    this.minNote = 4


  }

  calculateMinTimeInterval() {
    return this.calculateTimeInterval(this.bpmMin, 32)
  }
  calculateMaxTimeInterval() {
    return this.calculateTimeInterval(this.bpmMax, 1)
  }

  calculateTimeIntervalVideo() {
    let min = this.calculateMinTimeInterval()
    let max = this.calculateMaxTimeInterval()
    let current = this.calculateTimeInterval(this.bpm, 4)

    let noteScalling = 1 / (this.note - 1) / (32 - 1) * 400


    return ((current - min) / (max -min) * this.videoScallingFactor) + noteScalling

  }

  calculateTimeout() {
    this._time += this.timeInterval;
    this._diff = (new Date().getTime() - this._startTime) - this._time;
    return this.timeInterval - this._diff
  }

  run() {
    this.timeInterval = this.calculateTimeIntervalVideo()

    this.timeout = setTimeout(
      () => this.executeCallback()
      ,
      this.calculateTimeout()
    )
  }

  executeCallback() {
    this.Observable.callObservers('onTick', this)

    this.count++
    if (this.count > this.note) {
      this.count = 1
    }
    this.run()
  }

}