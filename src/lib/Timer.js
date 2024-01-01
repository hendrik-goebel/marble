export default class Timer {

  constructor(intervalDuration) {
    this.intervalDuration = intervalDuration
  }

  start() {
    let lastTimestamp = 0;
    let startTime;

    /**
     * Tick is used for animation and for audio.
     * For animation an event is fired on everyframe containing the delta between the last frame and the current frame.
     * This is used to calculate the distance the ball should move.
     *
     * For audio an event is fired an every beat, the intervalduration for a beat is passed in the constructor.
     */
    const tick = (timestamp) => {

      if (!startTime) {
        startTime = timestamp;
        lastTimestamp = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed >= this.intervalDuration) {
        startTime = timestamp;

        const beatEvent = new CustomEvent(
          'beat', {
            detail: {
              value: 1,
            },
          })
        document.dispatchEvent(beatEvent);
      }

      // Time elapsed since last frame in seconds
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const animationTickEvent = new CustomEvent(
        'animationTick', {
          detail: {
            deltaTime: deltaTime,
          },
        })
      document.dispatchEvent(animationTickEvent);
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick);
  }
}