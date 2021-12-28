import PlusMinusControl from "./components/PlusMinusControl";

export default class MetronomeInstrumentControl extends PlusMinusControl {

  constructor(sounds) {
    super(sounds, 'metronome-instrument');
  }

  onUpdateControl(property, sound) {
    if (property != 'metronome-instrument') {
      return
    }
    this.state.metronomeInstrument = sound
    this.setValue(sound)
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }
}