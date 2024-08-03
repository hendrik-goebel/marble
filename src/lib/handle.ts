import {
  selectBars,
  selectCurrentBar,
  updateBar,
  selectEditMode,
  setCurrentBar,
  setEditMode,
  updateBars
} from "./store/canvasSlice";
import {store} from "./store/store";
import {Bar} from "./models/CanvasObjects";
import * as change from "./change";
import {EditMode, ObjectStyle} from "./types";
import * as collision from "./collision";
import {selectCurrentSound} from "./store/controlsSlice";
import * as create from "./create";
import {setup} from "./setup"

let barOffsetX = 0;
let barOffsetY = 0;

export function mouseDown(x: number, y: number) {
  let bars: Bar[] = selectBars(store.getState());
  bars = bars.map(bar => change.barStyle(bar, ObjectStyle.normal));
  let barsClicked = bars.filter(bar => collision.isPositionInsideBar(x, y, bar));
  if (barsClicked.length > 0) {
    let barClicked = barsClicked[barsClicked.length-1];
    bars = bars.filter(bar => bar.id !== barClicked.id);
    let barActivated = mouseDownOnBar(barClicked, x, y);
    bars.push(barActivated);
  } else {
    const newBar = mouseDownOnFreeSpace(x, y);
    bars.push(newBar);
  }
  store.dispatch(updateBars(bars));
}

function mouseDownOnFreeSpace(x: number, y: number): Bar {
  const currentSound = selectCurrentSound(store.getState());
  const newBar = create.bar(currentSound, x, y);
  store.dispatch(setEditMode(EditMode.draw));
  store.dispatch(setCurrentBar(newBar));
  return newBar;
}

function mouseDownOnBar(bar: Bar, x: number, y: number): Bar {
  barOffsetX = x - bar.x;
  barOffsetY = y - bar.y;
  const collisionBarUpdated = change.barStyle(bar, ObjectStyle.highlight);
  store.dispatch(setCurrentBar(collisionBarUpdated));
  store.dispatch(setEditMode(EditMode.move))
  return collisionBarUpdated;
}

export function mouseUp(x: number, y: number) {
  store.dispatch(setEditMode(EditMode.none));
}

export function mouseMove(x: number, y: number) {
  const bar: Bar|null = selectCurrentBar(store.getState());
  if (bar === null) {
    return;
  }
  const currentBar = {...bar};
  if (currentBar.x === undefined || currentBar.y === undefined)
  {
    return;
  }
  switch (selectEditMode(store.getState())) {
    case EditMode.draw:
      let  width = x - bar.x;
      width = width < setup.bar.width ? setup.bar.width : width;
      let height = y - bar.y;
      height = height < setup.bar.height ? setup.bar.height : height;
      currentBar.width = width;
      currentBar.height = height;
      break;
    case EditMode.move:
      currentBar.x = x - barOffsetX
      currentBar.y = y - barOffsetY;
      break;
  }
  store.dispatch(updateBar(currentBar));
  store.dispatch(setCurrentBar(currentBar));
}

export function doubleClick(x: number, y: number)
{
  const bars: Bar[] = selectBars(store.getState());
  let barsUpdated: Bar[] = [];
  for (const bar of bars) {
    if (!collision.isPositionInsideBar(x, y, bar)) {
      barsUpdated.push(change.barStyle(bar, ObjectStyle.normal));
      barsUpdated.push(bar);
    }
  }

  store.dispatch(updateBars(barsUpdated));

  store.dispatch(setEditMode(EditMode.none))
}