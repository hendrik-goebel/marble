import Ball from "./Ball";
import setup from "./Setup";
import CanvasView from '../lib/CanvasView.js'
import Timer from './Timer.js'
import * as Tone from 'tone'
import * as Calculator from './Calculator.js'


export default class Director {
  constructor(context) {
    this.canvas = new CanvasView(context);
    this.timer = new Timer(setup.system.audio.bpm);
    this._bpm = null;
    this.isPlaying = null;
    this.isPulseEnabled = null;
  }

  init() {
    document.addEventListener('tick', (event) => {
      let deltaTime = event.detail.deltaTime;
      this.ball.distance = Calculator.calculateDistanceByBpm(this._bpm, deltaTime)
      let beatValue = event.detail.beat;

      console.log('beat', beatValue);

      if (this.ball.isVisible === false && beatValue === 1) {
        this.ball.isVisible = true
      }

      if (this.ball.isVisible) {
        this.ball.move();
      }

      if (this.ball.y > this.canvas.height) {
        this.ball.reset()
        this.ball.isVisible = false
      }

      if (this.ball.isVisible) {
        this.canvas.draw(this.ball)
      } else {
        this.canvas.clearBall(this.ball);
      }
    });

    document.addEventListener('beat', (event) => {
      if (this.isPulseEnabled) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C3", "32n");
      }
    });

    this.ball = new Ball(setup.ball)
    this.timer.init()
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
    this.canvas.width = width
  }

  set canvasHeight(height) {
    this.canvas.height = height
  }
}