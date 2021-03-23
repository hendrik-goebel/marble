export default class AudioPlayer {

  constructor() {
    this.registerSounds()
  }

  registerSounds() {
    createjs.Sound.registerSound("samples/Kick02.wav", "sound");
    createjs.Sound.registerSound("samples/Kick17.wav", "sound2");
  }

  play() {
    createjs.Sound.play("sound", {interrupt: createjs.Sound.INTERRUPT_ANY});
  }
  play2() {
    createjs.Sound.play("sound2", {interrupt: createjs.Sound.INTERRUPT_ANY});
  }
}