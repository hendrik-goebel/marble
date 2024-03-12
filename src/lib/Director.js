import setup from "./Setup";
import Timer from './Timer.js'
import * as Calculator from './Calculator.js'
import AudioPlayer from "./AudioPlayer";

/**
 * Coordinates the game loop so that audio and visual elements are in sync
 */
export default class Director {
  constructor(canvasController) {
    this.canvasController = canvasController;
    this.timer = new Timer(setup.system.audio.bpm);
    this._bpm = null;
    this.isPlaying = false;
    this.isPulseEnabled = null;
    this.audioPlayer = new AudioPlayer();
    this.sounds = {};
    this._currentSoundId = null;
    this.selectedBar = null;
  }

  init() {
    this.canvasController.initBalls();
    this.initEventListeners()
    this.timer.init()
  }

  initEventListeners() {
    document.addEventListener('tick', (event) => {
      const deltaTime = event.detail.deltaTime;
      const currentBeatValue = event.detail.beat;
      this.loop(deltaTime, currentBeatValue);
    });

    document.addEventListener('quant', (event) => {
      if (this.isPlaying) {
        this.audioPlayer.playBufferedSounds();
      }
    });

    document.addEventListener('beat', (event) => {
      if (this.isPlaying) {
        let beatValue = event.detail.beat;
        if (beatValue === 1) {
          this.canvasController.spawnBall()
        }

        if (this.isPulseEnabled) {
          this.audioPlayer.playSound('pulse');
        }
      }
    });

    document.addEventListener('collision', (event) => {
      this.audioPlayer.bufferSound(event.detail.bar.soundId);
    });

    document.addEventListener('barSpawned', (event) => {
      event.detail.bar.soundId = this.currentSoundId;
    });

    document.addEventListener('barSelected', (event) => {
      this.selectedBar = event.detail.bar;
    });
  }

  loop(deltaTime, currentBeatValue) {
    const ballDistance = Calculator.calculateDistanceByBpm(this._bpm, deltaTime)
    if (this.isPlaying) {
      this.canvasController.moveBalls(ballDistance);
    }
    this.canvasController.redrawAll();
  }

  set bpm(bpm) {
    this._bpm = bpm
    this.timer.bpm = bpm
  }

  set quantisation(quantisation) {
    this.timer.quantisation = quantisation
  }

  set canvasWidth(width) {
    this.canvasController.width = width
  }

  set isPlaying(value) {
    this.timer.isPlaying = value
    this._isPlaying = value
  }

  get isPlaying() {
    return this._isPlaying
  }

  set canvasHeight(height) {
    this.canvasController.height = height
  }

  set sounds(sounds) {
    this.audioPlayer.sounds = sounds;
  }
  set currentSoundId(id) {
    this._currentSoundId = id;
    if (id && this.selectedBar) {
      this.selectedBar.soundId = id;
    }
  }

  get currentSoundId() {
    return this._currentSoundId;
  }
}