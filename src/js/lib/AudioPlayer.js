export default class AudioPlayer {

  registerSounds(sounds) {
    for (let sound of sounds) {
      createjs.Sound.registerSound(sound.file, sound.name);
    }
  }

  play(sound) {
      createjs.Sound.play(sound.name, {interrupt: createjs.Sound.INTERRUPT_ANY});
  }
}