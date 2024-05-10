import {Ball, Bar} from "./models/CanvasObjects";
import setup from './setup';
import {Sound} from './types';

let ballId = 0;
let barId = 0;
export function ball(x?: number, y?:number): Ball {
  let xCoordinate:number = x || setup.ball.x;
  let yCoordinate:number = y || setup.ball.y;

  let ball: Ball = {
    id: ballId++,
    x: setup.ball.x,
    y: setup.ball.y,
    color: setup.ball.color,
    radius: setup.ball.radius
  }
  return ball;
}

export function bar(sound: Sound, x?: number, y?:number): Bar {

  let xCoordinate:number = x || setup.bar.x;
  let yCoordinate:number = y || setup.bar.y;

  let bar: Bar = {
    id: barId++,
    x: xCoordinate,
    y: yCoordinate,
    sound: sound,
    color: setup.bar.color,
    width: setup.bar.width,
    height: setup.bar.height
  }
  return bar;
}
