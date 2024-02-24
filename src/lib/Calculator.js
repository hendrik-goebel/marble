

export function calculateInterval(bpm, noteValue, quantisation) {
  const noteDuration = quantisation / noteValue;
  const noteValueInMilliseconds = 60000 / bpm / noteDuration
  return noteValueInMilliseconds
}

export function calculateDistanceByBpm(bpm, deltaTime) {
  return bpm * (deltaTime * 1.5)
}