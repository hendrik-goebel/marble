import './components/SwitchControl'
import SwitchControl from "./components/SwitchControl";

/**
 * Switch to turn metronome off and on
 */
export default class MetronomeControl extends SwitchControl {

  constructor() {
    super('metronome')
  }

  onStartPlaySound(property) {
    if (property == this.elementId) {
      for (let element of this.elements) {
        element.classList.add('metronome-playing')
        setTimeout(() => {
          element.classList.remove('metronome-playing')
        }, 200)
      }
    }
  }


  initListeners() {
    super.initListeners()
    this.container.directorAudio.Observable.addObserver((args) => {
      this.onStartPlaySound(args.property, args.value)
    }, 'onStartPlaySound')
  }
}
