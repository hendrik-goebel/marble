
import {Observable} from "./helper/ObservableMixin";
import EventRouter from "./EventRouting";
import setup from "./Setup";
import sounds from "./config/Sounds.js"
import constants from "./Constants.js"

import Director from './Director.js'
import DirectorUserInteraction from './DirectorUserInteraction.js'
import DirectorTimer from './DirectorTimer.js'
import Canvas from './Canvas.js'
import Factory from './Factory.js'
import Controls from './interaction/Controls.js'
import StageUserInterface from './interaction/StageUserInterface.js'
import CollisionDetector from "./CollisionDetector"
import AudioPlayer from "./AudioPlayer"
import DirectorAudio from "./DirectorAudio.js"
import State from "./State.js"
import Timer from "./Timer.js"
import VideoTimer from "./VideoTimer.js"

/**
 * Manages initialization of objects and corresponding dependencies
 */
export default class Container {

  init() {
    this.setup = setup
    Object.assign(Timer.prototype, this.getDefaultPrototypeProperties())
    Object.assign(VideoTimer.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Controls.prototype, this.getDefaultPrototypeProperties())
    Object.assign(StageUserInterface.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Director.prototype, this.getDefaultPrototypeProperties())
    Object.assign(DirectorUserInteraction.prototype, this.getDefaultPrototypeProperties())
    Object.assign(DirectorTimer.prototype, this.getDefaultPrototypeProperties())
    Object.assign(DirectorAudio.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Canvas.prototype, this.getDefaultPrototypeProperties())
    Object.assign(EventRouter.prototype, this.getDefaultPrototypeProperties())
    Object.assign(Factory.prototype, this.getDefaultPrototypeProperties())
    Object.assign(CollisionDetector.prototype, this.getDefaultPrototypeProperties())

    this.initClassMapping()
    this.eventRouting = new EventRouter()
    this.canvas = new Canvas(createjs)
    this.factory = new Factory()
    this.collisionDetector = new CollisionDetector()
    this.audioplayer = new AudioPlayer()
    this.controls = new Controls(sounds)
    this.stageUi = new StageUserInterface(this.canvas.stage)
    this.audioplayer = new AudioPlayer()
    this.state = new State()
    this.directorUI = new DirectorUserInteraction(this.state, this.factory, this.collisionDetector)
    this.director = new Director(this.canvas, this.factory, this.collisionDetector, this.state)
    this.directorAudio = new DirectorAudio(this.audioplayer, sounds)
    this.directorTimer = new DirectorTimer()
  }

  getDefaultPrototypeProperties() {
    return {
      'Observable': Observable,
      'container': this,
      'setup': this.setup,
      'CONST': constants
    }
  }

  initClassMapping() {
    this.classMapping = {
      'Timer': (args) => {
        let timer = new Timer(args[1], args[2])
       // this.eventRouting.assignTimerEvents(timer)
        return timer
      },
      'VideoTimer': (args) => {
        let timer = new VideoTimer(args[1], args[2])
      //  this.eventRouting.assignTimerEvents(timer)
        return timer
      },
    }
  }

  /**
   * If instances need to be created on runtime this method can be used
   * to make sure all dependencies are resolved
   *
   * @param className
   * @param args
   * @returns {*}
   */
  create(className, ...args) {
    if (className in this.classMapping) {
      return this.classMapping[className](arguments)
    }
  }
}