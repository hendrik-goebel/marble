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
    this.initBalls();
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
        this.spawnBall()
      }

      if (this.isPulseEnabled) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C3", "32n");
      }
    });

    document.addEventListener('onCanvasDraw', (event) => {
      console.log("Drawing")
    });
  }

  initBalls() {
    this.balls = []
    for (let i = 0; i < setup.dropper.maxBalls; i++) {
      this.balls.push(new Ball(setup.ball))
    }
    this.balls[this.balls.length - 1].isVisible = true;
  }

  loop(deltaTime, currentBeatValue) {
    const ballDistance = Calculator.calculateDistanceByBpm(this._bpm, deltaTime)

    this.balls.forEach((ball) => {
      if (ball.isVisible) {
        ball.distance = ballDistance;
        ball.move()
        this.canvas.draw(ball)
      }

      if (ball.yb > this.canvas.height) {
        this.canvas.clearBall(ball);
        ball.reset()
      }

      if (ball.isVisible) {
        this.canvas.draw(ball)
      }
    })
  }

  spawnBall() {
    this.balls.forEach((ball) => {
      if (!ball.isVisible) {
        ball.isVisible = true
        return
      }
    })
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