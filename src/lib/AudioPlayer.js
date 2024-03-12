import * as Tone from 'tone'

class AudioPlayer {

  constructor() {

    this.sounds = {};
    this.soundsToPlay = [];
  }

  bufferSound(soundId) {
    if (this.sounds.hasOwnProperty(soundId)) {
      this.soundsToPlay.push(this.sounds[soundId]);
    }
  }

  playBufferedSounds() {
    let sound;
    while (sound = this.soundsToPlay.pop()) {
      this.playSound(sound);
    }
  }
  playSound(sound) {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(sound.value, "32n");
  }
}

export default AudioPlayer;