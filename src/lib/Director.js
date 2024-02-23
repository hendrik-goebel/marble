import setup from "./Setup";
import Timer from './Timer.js'
import * as Tone from 'tone'
import * as Calculator from './Calculator.js'

/**
 * Coordinates the game loop so that audio and visual elements are in sync
 */
export default class Director {
  constructor(canvasController) {
    this.canvasController = canvasController;
    this.timer = new Timer(setup.system.audio.bpm);
    this._bpm = null;
    this.isPlaying = null;
    this.isPulseEnabled = null;
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

    document.addEventListener('beat', (event) => {
      let beatValue = event.detail.beat;
      console.log(beatValue);
      if (beatValue === 1) {
        this.canvasController.spawnBall()
      }

      if (this.isPulseEnabled) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C3", "32n");
      }
    });
  }

  loop(deltaTime, currentBeatValue) {
    const ballDistance = Calculator.calculateDistanceByBpm(this._bpm, deltaTime)
    this.canvasController.moveBalls(ballDistance);
  }


  set isPlaying(isPlaying) {
    if (isPlaying) {
      this.timer.start()
    } else {
      this.timer.stop();
    }
  }

  set bpm(bpm) {
    this._bpm = bpm
    this.timer.bpm = bpm
  }

  set canvasWidth(width) {
    this.canvasController.width = width
  }

  set canvasHeight(height) {
    this.canvasController.height = height
  }
}