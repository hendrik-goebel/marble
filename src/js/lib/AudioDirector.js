/**
 * Manages everything releated to audio.
 */
export default class AudioDirector {

  constructor(audioPlayer) {
    this.player = audioPlayer
    this.clocks = []
  }

  createClock(id) {
    let audioClock = this.container.create('AudioClock', 1)
    this.clocks.push(audioClock)
  }

  start() {
    for (let clock of this.clocks) {
      clock.run()
    }
  }

  /**
   * Will be called everytime we are on beat
   * @param id
   */
  onBeat(id) {
    this.player.play()
  }
}