import { store } from './store/store'
import { selectBpm } from './store/controlsSlice'
export function init(): Timer {
  return Timer.getInstance(selectBpm(store.getState()));
}

export default class Timer {

  private static instance: Timer;

  _bpm: number;
  _beatsPerMeasure: number;
  _currentBeat: number;
  _isPlaying: boolean;
  _quantisation: number;
  _quant: number;
  _intervalDuration: number;

  private constructor(bpm: number) {
    this._bpm = bpm
    this._beatsPerMeasure = 4;
    this._currentBeat = 0;
    this._isPlaying = true;
    this._quantisation = 16;
    this._quant = 0;
    this._intervalDuration = 0;
    this._intervalDuration = this.calculateInterval(this._bpm, this._beatsPerMeasure, this._quantisation);
    this.init();
  }

  public static getInstance(bpm: number) {
    if (!Timer.instance) {
      Timer.instance = new Timer(bpm);
    }
    return Timer.instance;
  }

  private init() {
    let lastTimestamp = 0;
    let startTime: number;

    const tick = (timestamp: number) => {
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
            beat: this._currentBeat,
          },
        })
      document.dispatchEvent(tickEvent);

      if (elapsed >= this._intervalDuration) {
        if (this._isPlaying) {
          startTime = timestamp;
          this._quant++;
          if (this._quant > this.quantisation) {
            this._quant = 1;
          }

          const quantEvent = new CustomEvent(
            'quant', {
              detail: {
                value: this._quant
              },
            });
          document.dispatchEvent(quantEvent);

          if ((this._quant % (this.quantisation / this._beatsPerMeasure) === 0)) {
            this._currentBeat++;
            if (this._currentBeat > this._beatsPerMeasure) {
              this._currentBeat = 1;
            }

            const beatEvent = new CustomEvent(
              'beat', {
                detail: {
                  beat: this._currentBeat,
                },
              })

            document.dispatchEvent(beatEvent);
          }
        }

      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick);
  }

  calculateInterval(bpm: number, noteValue: number, quantisation: number) {
    const noteDuration = quantisation / noteValue;
    const noteValueInMilliseconds = 60000 / bpm / noteDuration
    return noteValueInMilliseconds
  }

  set bpm(bpm) {
    this._bpm = bpm
    this._intervalDuration = this.calculateInterval(this._bpm, this._beatsPerMeasure, this.quantisation);
  }

  get bpm() {
    return this._bpm
  }

  set quantisation(quantisation) {
    this._quantisation = quantisation
    this._intervalDuration = this.calculateInterval(this._bpm, this._beatsPerMeasure, this.quantisation);
  }

  get quantisation() {
    return this._quantisation
  }
}