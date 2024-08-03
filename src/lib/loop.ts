import * as canvasSlice from './store/canvasSlice'
import * as controlsSlice from "./store/controlsSlice";
import * as draw from './draw';
import * as create from './create';
import * as move from './move';
import * as reset from './reset';
import {store} from './store/store';
import * as collision from './collision';


export function init(context: CanvasRenderingContext2D) {
  let ball = create.ball();
  store.dispatch(canvasSlice.addBall(ball));

  document.addEventListener('beat', (event) => {
    //console.log((event as CustomEvent).detail);
  })

  document.addEventListener('tick', (event) => {
    const detail = (event as CustomEvent).detail;
    const deltaTime = detail.deltaTime;
    tick(context, deltaTime, controlsSlice.selectBpm(store.getState()));
  });
}

function tick(context: CanvasRenderingContext2D, deltaTime: number, bpm: number) {
  const ballDistance = calculateDistanceByBpm(bpm, deltaTime)
  moveBalls(ballDistance);
  syncCurrentBarWithCurrentSound();
  updateCanvas(context);
}

function updateCanvas(context: CanvasRenderingContext2D)
{
  draw.clear(context);
  draw.balls(context, canvasSlice.selectBalls(store.getState()));
  draw.bars(context, canvasSlice.selectBars(store.getState()));
}

function syncCurrentBarWithCurrentSound()
{
  const currentSound = controlsSlice.selectCurrentSound(store.getState());
  const currentBar = canvasSlice.selectCurrentBar(store.getState());
  if (currentBar && currentBar.sound !== currentSound) {
    let updatedBar = {
      ...currentBar,
      sound: currentSound
    }
    store.dispatch(canvasSlice.updateBar(updatedBar));
  }
}

function moveBalls(distance: number) {
  let balls = canvasSlice.selectBalls(store.getState()).map(ball => ({...ball}))
  const canvas = store.getState().canvas.canvas;
  for (let ball of balls) {
    move.ball(ball, distance);
    if (collision.ballWithCanvas(ball, canvas) === 'bottom') {
      reset.ball(ball);
    }
  }
  store.dispatch(canvasSlice.setBalls(balls));
}

function calculateDistanceByBpm(bpm: number, deltaTime: number): number {
  return bpm * (deltaTime * 1.5)
}


