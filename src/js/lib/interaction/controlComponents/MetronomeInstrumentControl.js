import PlusMinusControl from "./components/PlusMinusControl";

export default class MetronomeInstrumentControl extends PlusMinusControl {

  constructor(sounds) {
    super(sounds, 'metronome-instrument');
  }
}