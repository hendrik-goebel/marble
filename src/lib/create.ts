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
    x: xCoordinate,
    y: yCoordinate,
    color: setup.ball.style.normal,
    radius: setup.ball.radius,
    directionX: 1,
    directionY: 1
  }
  return ball;
}

export function bar(sound: Sound, x?: number, y?:number): Bar {

  let xCoordinate:number = x || setup.bar.x;
  let yCoordinate:number = y || setup.bar.y;
  const width = setup.bar.width;
  const height = setup.bar.height;

  xCoordinate = xCoordinate - (width / 2);
  xCoordinate = xCoordinate < 0 ? 0 : xCoordinate;
  xCoordinate = xCoordinate + width > setup.app.canvas.width ? setup.app.canvas.width - width : xCoordinate;
  yCoordinate = yCoordinate - (height / 2);
  yCoordinate = yCoordinate < 0 ? 0 : yCoordinate;
  yCoordinate = yCoordinate + height > setup.app.canvas.height ? setup.app.canvas.height - height : yCoordinate;


  let bar: Bar = {
    id: barId++,
    x: xCoordinate,
    y: yCoordinate,
    sound: sound,
    color: setup.bar.style.highlight,
    width: width,
    height: height
  }
  return bar;
}
