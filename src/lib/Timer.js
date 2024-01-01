import {calculateInterval} from "./Calculator";

export default class Timer {
  constructor(bpm) {
    this._bpm = bpm
  }

  start() {
    let lastTimestamp = 0;
    let startTime;

    const tick = (timestamp) => {

      if (!startTime) {
        startTime = timestamp;
        lastTimestamp = timestamp;
      }

      const elapsed = timestamp - startTime;

      // Time elapsed since last frame in seconds
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const tickEvent = new CustomEvent(
        'tick', {
          detail: {
            deltaTime: deltaTime,
          },
        })
      document.dispatchEvent(tickEvent);

      if (elapsed >= this.intervalDuration) {
        startTime = timestamp;
        const beatEvent = new CustomEvent(
          'beat', {
            detail: {
              value: 1,
              timestamp: timestamp,
            },
          })
        document.dispatchEvent(beatEvent);
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick);
  }

  set bpm(bpm) {
    this._bpm = bpm
    const intervalDuration = calculateInterval(this._bpm, 4)
    this.intervalDuration = intervalDuration
  }
}