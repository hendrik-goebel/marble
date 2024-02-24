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
    this.isPlaying = false;
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
      if (beatValue === 1 && this.isPlaying) {
        this.canvasController.spawnBall()
      }

      if (this.isPulseEnabled && this.isPlaying) {
        const note = beatValue === 1 ? "C4" : "C3";
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, "32n");
      }
    });

    document.addEventListener('collision', (event) => {
      const ball = event.detail.ball;
      const bar = event.detail.bar;
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease("A2", "32n");

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
}