import './components/SwitchControl'
import SwitchControl from "./components/SwitchControl";

/**
 * Switch to turn metronome off and on
 */
export default class BarMovesControl extends SwitchControl {

  constructor() {
    super('barmoves')
  }
}