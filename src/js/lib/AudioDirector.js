/**
 * Manages everything releated to audio.
 */
export default class AudioDirector {

  constructor(audioPlayer) {
    this.player = audioPlayer
    this.timers = {}
    this.timerId = 1
    this.quantisation = true
    this.soundsToPlay = []
    this.metronome = true
    this.sounds = [
      {
        "name": "Click",
        "file": "samples/click.wav"
      },
      {
        "name": "Kick",
        "file": "samples/Kick02.wav"
      }
    ]

    this.player.registerSounds(this.sounds)
    this.soundRelations = {
      'xyz': 1
    }
  }

  playSound(entity) {

    let id = 'xyz';
    let sound
    if (id in this.soundRelations) {
      sound = this.sounds[this.soundRelations[id]]
      if (this.quantisation) {
        this.soundsToPlay.push(sound)
      }
      else {
        this.player.play(sound)
      }
    }
  }

  playSounds() {
    let sound
    while(sound = this.soundsToPlay.pop()) {
      this.player.play(sound)
    }
  }

  start() {
    this.createTimer(this.timerId)
    for (let id in this.timers) {
      this.timers[id].run()
    }
  }

  createTimer(id) {
    this.timers[this.timerId] = this.container.create("Timer", id)
    this.timers[this.timerId].note = 16
    this.timers[this.timerId].measure = 5
  }


  get resolution() {
    return this.timers[this.timerId].resolution
  }

  playCollisionSound(entity) {
    if (entity.type == this.CONST.TYPE.BALL && entity.collision.object.type == this.CONST.TYPE.BAR) {
      this.playSound(entity)
    }
  }

  playMetronome() {
    this.player.play(this.sounds[0])
  }

  /**
   * Will be called everytime we are on beat
   * @param id
   */
  onBeat(id, count) {
    if (id < 100) {
      if (count == 1) {
        this.playMetronome()
      }
      this.playSounds()
    }
  }

  onUpdateControl(property, value) {
    if (property == 'grid') {
      this.timers[this.timerId].resolution = value
    }
  }
}