
import {Observable} from "./helper/ObservableMixin";
import EventRouter from "./EventRouting";
import setup from "./Setup";
import constants from "./Constants.js"

import Director from './Director.js'
import DirectorUserInteraction from './DirectorUserInteraction.js'
import Canvas from './Canvas.js'
import Factory from './Factory.js'
import StageUserInterface from './interaction/StageUserInterface.js'
import CollisionDetector from "./CollisionDetector"
import AudioPlayerCreateJs from "./audio/AudioPlayerCreateJs"
import AudioPlayerSoundJs from "./audio/AudioPlayerSoundJs"
import DirectorAudio from "./audio/DirectorAudio.js"
import State from "./State.js"
import VideoTimer from "./VideoTimer.js"
import AudioTimer from "./audio/AudioTimer.js"
import CollisionTest from "./CollisionTest";
import PlusMinusControl from './interaction/controlComponents/components/PlusMinusControl.js'
import MetronomeInstrumentControl from './interaction/controlComponents/MetronomeInstrumentControl'
import MetronomeControl from './interaction/controlComponents/MetronomeControl'
import BarMovesControl from './interaction/controlComponents/BarMovesControl.js'
import QuantisationControl from './interaction/controlComponents/QuantisationControl'
import MetronomeQuantisationControl from './interaction/controlComponents/MetronomeQuantisationControl'
import SpeedControl from './interaction/controlComponents/SpeedControl'
import BaseComponent  from './interaction/controlComponents/components/BaseComponent'
import InstrumentButtonControl from "./interaction/controlComponents/instrumentButtonControl";
import ActiveInstrumentDisplay from "./interaction/controlComponents/ActiveInstrumentDisplay";

/**
 * Manages initialization of objects and corresponding dependencies
 */
export default class Container {

  init(sounds) {
    this.sounds = sounds
    this.setup = setup
    this.state = new State()
    Object.assign(VideoTimer.prototype, this.getDefaultPrototypeProperties())
    Object.assign(AudioTimer.prototype, this.getDefaultPrototypeProperties())
    Object.assign(StageUserInterface.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Director.prototype, this.getDefaultPrototypeProperties())
    Object.assign(DirectorUserInteraction.prototype, this.getDefaultPrototypeProperties())
    Object.assign(DirectorAudio.prototype, this.getDefaultPrototypeProperties())
    Object.assign(BaseComponent.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Canvas.prototype, this.getDefaultPrototypeProperties())
    Object.assign(EventRouter.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Factory.prototype, this.getDefaultPrototypeProperties())
    Object.assign(CollisionDetector.prototype, this.getDefaultPrototypeProperties())
    Object.assign(AudioPlayerSoundJs.prototype, this.getDefaultPrototypeProperties())
    Object.assign(PlusMinusControl.prototype, this.getDefaultPrototypeProperties())
    Object.assign(SpeedControl.prototype, this.getDefaultPrototypeProperties())
    Object.assign(MetronomeControl.prototype, this.getDefaultPrototypeProperties())
    Object.assign(MetronomeQuantisationControl.prototype, this.getDefaultPrototypeProperties())
    Object.assign(BarMovesControl.prototype, this.getDefaultPrototypeProperties())
    Object.assign(ActiveInstrumentDisplay.prototype, this.getDefaultPrototypeProperties())
    Object.assign(InstrumentButtonControl.prototype, this.getDefaultPrototypeProperties())

    this.eventRouting = new EventRouter()
    this.canvas = new Canvas(createjs)
    this.factory = new Factory()
    this.collisionDetector = new CollisionDetector()
    this.audioplayer = new AudioPlayerSoundJs()
    this.videoTimer = new VideoTimer(101, 'video')
    this.audioTimer = new AudioTimer()
    this.director = new Director(this.canvas, this.factory, this.collisionDetector, this.state, this.videoTimer)
    this.directorAudio = new DirectorAudio(this.audioplayer, this.sounds, this.audioTimer, this.metronomeTimer)
    this.speedControl = new SpeedControl()
    this.stageUi = new StageUserInterface(this.canvas.stage)
    this.directorUI = new DirectorUserInteraction(this.state, this.factory, this.collisionDetector)
    this.collisionTest = new CollisionTest(this.state, this.factory, this.director)
    this.activeInstrumentDisplay= new ActiveInstrumentDisplay()
    this.metronomeControl = new MetronomeControl()
    this.metronomeInstrumentControl = new MetronomeInstrumentControl(this.sounds)
    this.quantisationControl = new QuantisationControl()
    this.metronomeQuantisationControl = new MetronomeQuantisationControl()
    this.barmovesControl = new BarMovesControl()
    this.metronomeInstrumentControl = new InstrumentButtonControl(this.sounds)
  }

  getDefaultPrototypeProperties() {
    return {
      'Observable': Observable,
      'container': this,
      'setup': this.setup,
      'state': this.state,
      'CONST': constants
    }
  }
}