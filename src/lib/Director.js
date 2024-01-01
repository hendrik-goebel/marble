import Ball from "./Ball";
import setup from "./Setup";
import CanvasView from '../lib/CanvasView.js'
import Timer from './Timer.js'
import state from './State.js'
import {calculateInterval} from './Calculator.js'
import * as Tone from 'tone'


export default class Director {
  constructor(context) {
    this.canvas = new CanvasView(context);
    this.timer = new Timer(setup.system.audio.bpm);
  }
  init() {
    const synth = new Tone.Synth().toDestination();

    document.addEventListener('animationTick', (event) => {
      let deltaTime = event.detail.deltaTime;


      const distance = this._bpm * (deltaTime * 1.5)
      console.log("distance", distance)
      this.ball.distance = distance
      this.ball.move()

      if (this.ball.y > state.canvas.height) {
        this.ball.reset()
      }
      this.canvas.draw(this.ball)
    });

    document.addEventListener('beat', (event) => {
      console.log("BEAT");
      if (synth.state === "started") {
     //   synth.triggerRelease();
      }
    //  synth.triggerAttackRelease("C3", "16n");
    });

    this.ball = new Ball(setup.ball)
  }
  set bpm(bpm) {
    this._bpm = bpm
    const intervalDuration = calculateInterval(bpm, 4)
    this.timer.intervalDuration = intervalDuration
  }

  set canvasWidth(width) {
    state.canvas.width = width
    this.canvas.width = width
  }

  set canvasHeight(height) {
    state.canvas.height = height
    this.canvas.height = height
  }

  start() {
    this.timer.start()
  }
}