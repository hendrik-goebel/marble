import Timer from "./Timer.js"

export default class VideoTimer extends Timer {


  constructor() {
    super();
    this.bpmMin = this.setup.system.audio.bpmMin
    this.bpmMax = this.setup.system.audio.bpmMax
    this.baseTickTime = this.setup.system.video.baseTickTime
    this.scallingFactor = this.setup.system.video.scallingFactor
    this.maxNote = 32
    this.minNote = 1
    this.note = this.setup.system.audio.note

  }

  getScalling() {
    let bpmSpeed = ((this.bpm  - this.bpmMin) / (this.bpmMax - this.bpmMin) ) * 100
    let noteSpeed = ((this.note - this.minNote) / (this.maxNote - this.minNote)) * 30

    console.log(bpmSpeed)
    console.log(noteSpeed)
    console.log(this.note)
    return bpmSpeed + noteSpeed

  }

  calculateTimeout() {
    return this.baseTickTime - this.getScalling()
  }

  run() {
    this.timeout = setTimeout(
      () => this.executeCallback(),
      this.calculateTimeout()
    )
  }

  executeCallback() {
    this.Observable.callObservers('onTick', this)
    this.run()
  }
}