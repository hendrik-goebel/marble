import {calculateInterval} from "./Calculator";

export default class Timer {
  constructor(bpm) {
    this._bpm = bpm
    this.beatsPerMeasure = 4;
    this.currentBeat = 0;
    this.isPlaying = false;
    this.quantisation = 16;
    this.quant = 0;
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
        if (this.isPlaying) {
          startTime = timestamp;
          this.quant++;
          if (this.quant > this.quantisation) {
            this.quant = 1;
          }

          const quantEvent = new CustomEvent(
            'quant', {
              detail: {
                value: this.quant
              },
            });
          document.dispatchEvent(quantEvent);

          if ((this.quant % (this.quantisation / this.beatsPerMeasure) === 0)) {
            this.currentBeat++;
            if (this.currentBeat > this.beatsPerMeasure) {
              this.currentBeat = 1;
            }
            const beatEvent = new CustomEvent(
              'beat', {
                detail: {
                  beat: this.currentBeat,
                },
              })

        //    console.log("quant: ", this.quant, "beat: ", this.currentBeat)
            document.dispatchEvent(beatEvent);
          }
        }
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick);
  }

  set bpm(bpm) {
    this._bpm = bpm
    const intervalDuration = calculateInterval(this._bpm, this.beatsPerMeasure, this.quantisation);
    this.intervalDuration = intervalDuration
  }
}