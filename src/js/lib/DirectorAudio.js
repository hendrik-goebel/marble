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
    this.metronomeInstrument = this.defaultInstrument
    this.player.registerSounds(this.sounds)
    this._lastBeatTime
    this.initListeners()
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
      let soundName = entity.collision.object.sound
      this.Observable.callObservers('onStartPlaySound', {property: 'bar', value: soundName})
      this.playSound(this.findSoundByName(soundName))
    }
  }

  playMetronome() {
    if (this.metronome) {
      this.Observable.callObservers('onStartPlaySound', {property: 'metronome', value: this.metronomeInstrument})
      this.player.play(this.metronomeInstrument)
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

  onCollision(value) {
    this.playCollisionSound(value)
  }

  onUpdateControl(property, value) {

    if (property == 'instruments') {
      this.instrument = value
    }
    if (property == 'instrument-button') {
      this.instrument = value
    }

    if (property == 'metronome-instrument') {
      this.metronomeInstrument = value
    }

    if (property == 'metronome') {
      this.metronome = value
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }
}