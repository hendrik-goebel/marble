import './components/SwitchControl'
import SwitchControl from "./components/SwitchControl";

/**
 * Switch to turn metronome off and on
 */
export default class BarMovesControl extends SwitchControl {

  constructor() {
    super('barmoves', false)
    this.disable()
  }


  onSelectBar(property) {
    this.enable()
    if (this.state.activeBar.fixed) {
      this.uncheck()
    } else {
      this.check()
    }
  }

  onUnselectBar() {
    this.uncheck()
    this.disable()
  }

  initListeners() {
    super.initListeners()
    this.container.director.Observable.addObserver((args) => {
      this.onSelectBar(args.property, args.value)
    }, 'onSelectBar')

    this.container.director.Observable.addObserver((args) => {
      this.onSelectBar(args.property, args.value)
    }, 'onStartDrawBar')

    this.container.director.Observable.addObserver((args) => {
      this.onUnselectBar(args.property, args.value)
    }, 'onUnselectBar')
  }
}