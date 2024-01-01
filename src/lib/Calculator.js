

export function calculateInterval(bpm, noteValue) {
  const noteDuration = noteValue / 4;
  const noteValueInMilliseconds = 60000 / bpm / noteDuration
  return noteValueInMilliseconds
}

export function calculateDistanceByBpm(bpm, deltaTime) {
  return bpm * (deltaTime * 1.5)
}