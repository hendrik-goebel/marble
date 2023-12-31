import Ball from "./Ball";
import setup from "./Setup";
import CanvasView from '../lib/CanvasView.js'
import Timer from './Timer.js'
import state from './State.js'
import {calculateInterval} from './Calculator.js'

export default class Director {
  constructor(context) {
    this.canvas = new CanvasView(context);
    this.timer = new Timer(setup.system.audio.bpm);
  }
  init() {
    document.addEventListener('tick', (event) => {
      let deltaTime = event.detail.deltaTime;
      const distance = this._speed * (deltaTime * 1.5)
      this.ball.distance = distance
      this.ball.move()

      if (this.ball.y > state.canvas.height) {
        this.ball.reset()
      }
      this.canvas.draw(this.ball)
    });
    this.ball = new Ball(setup.ball)
    this.timer.start()
  }
  set speed(speed) {
    this._speed = speed
    const intervalDuration = calculateInterval(speed, 8)
    console.log(intervalDuration)
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
}