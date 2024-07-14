import * as Object from './models/CanvasObjects';
import { ObjectStyle } from './types';
import setup from './setup'

export function barStyle(bar: Object.Bar, style: ObjectStyle): Object.Bar {

  let changedBar = {...bar};
  if (style === ObjectStyle.normal) {
    changedBar.color = setup.bar.style.normal;
  }
  if (style === ObjectStyle.highlight) {
    changedBar.color = setup.bar.style.highlight;
  }
  return changedBar;
}