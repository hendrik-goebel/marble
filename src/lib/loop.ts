import {Ball, Bar} from './models/CanvasObjects';
import {addBall, addBar, selectBars, setCurrentBar, selectCurrentBar} from './store/canvasSlice'
import * as draw from './draw';
import * as create from './create';
import {store} from './store/store';
import * as collision from './collision';
import setup from './setup';

export default function init(context: CanvasRenderingContext2D) {

}

export function handleMouseDown(context: CanvasRenderingContext2D, x: number, y: number) {

  const bars = selectBars(store.getState());
  let isCollision = false;
  for (const bar of bars) {
    if (collision.isPositionInsideBar(x, y, bar)) {
      isCollision = true;
      let currentBar = selectCurrentBar(store.getState());


      store.dispatch(setCurrentBar(bar))

      break;
    }
  }

  if (isCollision === false) {
    let bar: Bar = create.bar(x, y);
    draw.bar(context, bar);
    store.dispatch(addBar(bar));
    store.dispatch(setCurrentBar(bar));
  }
}



