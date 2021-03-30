/**
 * Manages everything releated to audio.
 */
export default class DirectorAudio {

  constructor(audioPlayer, sounds) {
    this.player = audioPlayer
    this.quantisation = true
    this.soundsToPlay = []
    this.metronome = true
    this.sounds = sounds.samples
    this.samplesPath = sounds.path
    this.instrument = this.sounds[0]
    this.player.registerSounds(this.sounds, this.samplesPath)
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


  get resolution() {
    return this.audioTimer.resolution
  }

  playCollisionSound(entity) {
    if (entity.type == this.CONST.TYPE.BALL && entity.collision.object.type == this.CONST.TYPE.BAR) {
      this.playSound(this.findSoundByName(entity.collision.object.sound))
    }
  }

  playMetronome() {
    if (this.metronome) {

      this.player.play(this.sounds[0])
    }
  }

  findSoundByName(name) {
    for (let sound of this.sounds) {
      if (name == "first") {
        return sound
      }
      if (sound.name == name) {
        return sound
      }
    }
    return null
  }

  /**
   * Will be called everytime we are on beat
   * @param id
   */
  onBeat(timer) {
    if (timer.label == 'audio') {
      this.playSounds()
    }
    if (timer.label == 'metronome' ) {
      this.playMetronome()
    }
  }

  onUpdateControl(property, value) {

    if (property == 'instruments') {
      this.instrument = this.findSoundByName(value)
    }

    if (property == 'metronome') {
      this.metronome = !this.metronome
    }
  }
}