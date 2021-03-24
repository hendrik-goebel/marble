/**
 * Manages everything releated to audio.
 */
export default class AudioDirector {

  constructor(audioPlayer, sounds) {
    this.player = audioPlayer
    this.timers = {
      0: {
        'label': 'metronome',
        'note': 4,
        'measure': 4,
        'bpm': 120,
        'instance': null
      },
      1: {
        'label': 'audio',
        'note': 16,
        'measure': 4,
        'bpm': 120,
        'instance': null
      }
    }

    this.timerId = 1
    this.quantisation = true
    this.soundsToPlay = []
    this.metronome = true
    this.sounds = sounds.samples
    this.samplesPath = sounds.path
    this.instrument = this.sounds[0]
    this.player.registerSounds(this.sounds, this.samplesPath)
    this.soundRelations = {
      'xyz': 1
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
    this.createTimerInstances()
  }

  createTimerInstances() {
    for (let id in this.timers) {
      let timer = this.container.create("Timer", id)
      timer.applySetup(this.timers[id])
      timer.run()
      this.timers[id].instance = timer
    }
  }

  get resolution() {
    return this.timers[this.timerId].resolution
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
    if (timer.label == 'metronome') {
      this.playMetronome()
    }
  }


  onUpdateControl(property, value) {

    if (property == 'instruments') {
      this.instrument = this.findSoundByName(value)
    }
    if (property == 'note') {
      this.timers[this.timerId].instance.note = value
    }
    if (property == 'grid') {
      this.timers[this.timerId].resolution = value
    }
    if (property == 'bpm') {
      for (let id in this.timers) {
        this.timers[id].instance.bpm = value
      }
    }
    if (property == 'metronome') {

      this.metronome = !this.metronome
      console.log(this.metronome)
    }
  }
}