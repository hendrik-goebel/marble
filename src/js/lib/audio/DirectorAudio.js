/**
 * Manages everything releated to audio.
 */
export default class DirectorAudio {

  constructor(audioPlayer, sounds, audioTimer, metronomeTimer) {
    this.player = audioPlayer
    this.quantisation = true
    this.soundsToPlay = []
    this.metronome = true
    this.sounds = sounds
    this.instrument = this.defaultInstrument
    this.metronomeInstrument = this.defaultInstrument
    this.player.registerSounds(this.sounds)
    this.audioTimer = audioTimer
    this.metronomeTimer = metronomeTimer
    this._lastBeatTime
    this.initListeners()
    this.audioTimer.run()
    this.audioTimer.runMetronome()
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
    this.metronomeTimer.runMetronome()
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

  onBeat(property, value) {
    this.playSounds()
  }

  onMetronomeBeat(property, value) {
    this.playMetronome()
  }

  onNoisyCollision(value) {
    this.playCollisionSound(value)
  }

  onUpdateControl(property, value) {

    if (property == 'quantisation') {
      this.state.note = value
    }

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

    this.Observable.addObserver((args) => {
      this.onBeat(args.property, args.value)
    }, 'onBeat')

    this.Observable.addObserver((args) => {
      this.onMetronomeBeat(args.property, args.value)
    }, 'onMetronomeBeat')

    this.Observable.addObserver((args) => {
      this.onNoisyCollision(args)
    }, 'onNoisyCollision')
  }
}