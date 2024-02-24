import {calculateInterval} from "./Calculator";

export default class Timer {
  constructor(bpm) {
    this._bpm = bpm
    this.beatsPerMeasure = 4;
    this.noteValue = 4;
    this.currentBeat = 1;
    this.isPlaying = false;
  }

  init() {
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
            beat: this.currentBeat
          },
        })

      document.dispatchEvent(tickEvent);

      if (elapsed >= this.intervalDuration) {
        startTime = timestamp;
        if (this.isPlaying) {
          const beatEvent = new CustomEvent(
            'beat', {
              detail: {
                beat: this.currentBeat,
                timestamp: timestamp,
              },
            })

          document.dispatchEvent(beatEvent);
          this.currentBeat++;
          if (this.currentBeat > this.beatsPerMeasure) {
            this.currentBeat = 1;
          }
        }
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