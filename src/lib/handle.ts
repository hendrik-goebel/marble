import {setEditMode, updateBars, selectBars, setCurrentBar} from "./store/canvasSlice";
import {store} from "./store/store";
import {Bar} from "./models/CanvasObjects";
import * as change from "./change";
import {ObjectStyle, EditMode} from "./types";
import * as collision from "./collision";
import {selectCurrentSound} from "./store/controlsSlice";
import * as create from "./create";


export function checkAndHandleClickOnBar(x: number, y: number) {
  const bars: Bar[] = selectBars(store.getState());
  let barsUpdated: Bar[] = [];
  let isCollision: boolean = false;

  for (const bar of bars) {
    barsUpdated.push(change.barStyle(bar, ObjectStyle.normal));

    if (collision.isPositionInsideBar(x, y, bar)) {
      const collisionBarUpdated = change.barStyle(bar, ObjectStyle.highlight);
      store.dispatch(setCurrentBar(collisionBarUpdated));
      barsUpdated.push(collisionBarUpdated);
      isCollision = true;
    }
  }

  if (!isCollision) {
    const currentSound = selectCurrentSound(store.getState());
    barsUpdated.push(create.bar(currentSound, x, y));
    store.dispatch(setEditMode(EditMode.draw));
  }

  store.dispatch(updateBars(barsUpdated));
}

export function mouseUp(x: number, y: number) {

  store.dispatch(setEditMode(EditMode.none));
}