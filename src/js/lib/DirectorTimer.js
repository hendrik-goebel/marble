export default class DirectorTimer {

  constructor() {
    this.videoTimer = this.container.create('VideoTimer', 101, 'video')
    this.audioTimer = this.container.create("Timer", 1, 'audio')
    this.metronomeTimer = this.container.create("Timer", 2, 'metronome')
    this.metronomeTimer.note = 4
  }

  run() {
    this.videoTimer.run()
    this.audioTimer.run()
    this.metronomeTimer.run()
  }

  onUpdateControl(property, value) {
    if (property == 'bpm') {
      this.videoTimer.bpm = value
      this.audioTimer.bpm = value
      this.metronomeTimer.bpm = value
    }

    if (property == 'note') {
      this.videoTimer.note = value
      this.audioTimer.note = value
    }
  }
}