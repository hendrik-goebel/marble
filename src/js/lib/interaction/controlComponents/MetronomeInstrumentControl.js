import './PlusMinusControl'
import PlusMinusControl from "./PlusMinusControl";

export default class MetronomeInstrumentControl extends PlusMinusControl {

  constructor(sounds) {
    super(sounds, 'metronome-instrument');
  }
}