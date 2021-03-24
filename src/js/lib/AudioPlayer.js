export default class AudioPlayer {

  registerSounds(sounds, path="") {
    for (let sound of sounds) {
      createjs.Sound.registerSound(path + sound.file, sound.name);
    }
  }

  play(sound) {
      createjs.Sound.play(sound.name, {interrupt: createjs.Sound.INTERRUPT_ANY});
  }
}