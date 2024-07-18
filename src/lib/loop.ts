import {Bar} from './models/CanvasObjects';
import {addBall, setBalls, addBar, selectBars, setCurrentBar, selectCurrentBar, selectBalls} from './store/canvasSlice'
import {selectCurrentSound, selectBpm} from "./store/controlsSlice";
import * as draw from './draw';
import * as create from './create';
import * as move from './move';
import * as reset from './reset';
import * as handle from './handle'
import {store} from './store/store';
import * as collision from './collision';


export default function init(context: CanvasRenderingContext2D) {
  let ball = create.ball();
  store.dispatch(addBall(ball));

  document.addEventListener('beat', (event) => {
    //console.log((event as CustomEvent).detail);
  })

  document.addEventListener('tick', (event) => {
    const detail = (event as CustomEvent).detail;
    const deltaTime = detail.deltaTime;
    tick(context, deltaTime, selectBpm(store.getState()));
  });
}

function tick(context: CanvasRenderingContext2D, deltaTime: number, bpm: number) {
  const ballDistance = calculateDistanceByBpm(bpm, deltaTime)
  moveBalls(ballDistance);

  draw.clear(context);
  draw.balls(context, selectBalls(store.getState()));
  draw.bars(context, selectBars(store.getState()));
}

function moveBalls(distance: number) {
  let balls = selectBalls(store.getState()).map(ball => ({...ball}))
  const canvas = store.getState().canvas.canvas;
  for (let ball of balls) {
    move.ball(ball, distance);
    if (collision.ballWithCanvas(ball, canvas) === 'bottom') {
      reset.ball(ball);
    }
  }
  store.dispatch(setBalls(balls));
}

function calculateDistanceByBpm(bpm: number, deltaTime: number): number {
  return bpm * (deltaTime * 1.5)
}

export function handleMouseDown(context: CanvasRenderingContext2D, x: number, y: number) {
  handle.mouseDown(x, y);
}

export function handleMouseMove(context: CanvasRenderingContext2D, x: number, y: number) {
  handle.mouseMove(x, y);
}

export function handleMouseUp(context: CanvasRenderingContext2D, x: number, y: number) {
  handle.mouseUp(x, y);
}


