export default class Timer {

  start() {
    let lastTimestamp = 0;
    const animate = (timestamp) => {
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
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate);
  }
}