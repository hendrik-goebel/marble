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
  }

  init() {
    document.addEventListener('tick', (event) => {
      let deltaTime = event.detail.deltaTime;
      this.ball.distance = Calculator.calculateDistanceByBpm(this._bpm, deltaTime)
      this.ball.move()

      if (this.ball.y > this.canvas.height) {
        this.ball.reset()
      }
      this.canvas.draw(this.ball)
    });

    document.addEventListener('beat', (event) => {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease("C3", "32n");
    });

    this.ball = new Ball(setup.ball)
    this.timer.start()
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