import Timer from './Timer';

export default class VideoTimer extends Timer{

  get interval() {
    return 16
  }

  tick() {
    this.Observable.callObservers('onTick', {property: 'tick', value: this.count})
  }
}