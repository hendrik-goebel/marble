import * as Tone from 'tone'

class AudioPlayer {

  constructor() {
    this.sounds = {
      'bar': 'A2',
      'pulse': 'C4'
    }

    this.soundsToPlay = [];
  }

  bufferSound(name) {
    this.soundsToPlay.push(name);
  }

  playBufferedSounds() {
    let sound;
    while (sound = this.soundsToPlay.pop()) {
      this.playSound(sound);
    }
  }
  playSound(name) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(this.sounds[name], "32n");
  }
}

export default AudioPlayer;