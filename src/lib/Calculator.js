

export function calculateInterval(bpm, noteValue) {

  const noteDuration = noteValue / 4;
  const noteValueInMilliseconds = 60000 / bpm / noteDuration
  return noteValueInMilliseconds
}