/**
 * Manages everything releated to audio.
 */
export default class DirectorAudio {

  constructor(audioPlayer, sounds) {
    this.player = audioPlayer
    this.quantisation = true
    this.soundsToPlay = []
    this.metronome = true
    this.sounds = sounds
    this.instrument = this.defaultInstrument
    this.metronomeinstrument = this.defaultInstrument
    this.player.registerSounds(this.sounds)
    this._lastBeatTime
  }

  get defaultInstrument() {
    for (let key in this.sounds) {
      return key
    }
  }

  playSound(sound) {
    if (this.quantisation) {
      this.soundsToPlay.push(sound)
    } else {
      this.player.play(sound)
    }
  }

  playSounds() {
    let sound
    while (sound = this.soundsToPlay.pop()) {
      this.player.play(sound)
    }
  }

  start() {
    this.audioTimer.run()
    this.metronomeTimer.run()
  }

  playCollisionSound(entity) {
    if (entity.type == this.CONST.TYPE.BALL && entity.collision.object.type == this.CONST.TYPE.BAR) {
      this.playSound(this.findSoundByName(entity.collision.object.sound))
    }
  }

  playMetronome() {
    if (this.metronome) {
      this.player.play(this.metronomeinstrument)
    }
  }

  findSoundByName(name) {
    if (name == "first") {
      for (let sound in this.sounds) {
        return sound
      }
    }
    return name
  }

  /**
   * Will be called everytime we are on beat
   * @param id
   */
  onBeat(timer) {

    if (timer.label == 'audio') {
      this.playSounds()
    }
    if (timer.label == 'metronome') {
      this.playMetronome()

    }
  }

  onUpdateControl(property, value) {
    if (property == 'instruments') {
      this.instrument = value
    }

    if (property == 'metronome-instruments') {
      this.metronomeinstrument = value
    }

    if (property == 'metronome') {
      this.metronome = !this.metronome
    }
  }
}