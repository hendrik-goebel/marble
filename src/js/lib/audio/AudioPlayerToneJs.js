import * as Tone from "tone";

export default class AudioPlayerToneJs {

  constructor() {
    this.players
  }

  registerSounds(sounds, path = "") {
    this.players = new Tone.Players(sounds, {fadeIn: 0.01, fadeOut: 0.01}).toDestination();
    Tone.loaded().then(() => {
      this.Observable.callObservers('onSoundsLoaded')
    })
  }

  play(sound) {
    try {
      this.players.player(sound).start();
    } catch (e) {
      return
    }
  }
}