
import {Observable} from "./helper/ObservableMixin";
import EventRouter from "./EventRouting";
import setup from "./Setup";
import constants from "./Constants.js"

import Director from './Director.js'
import DirectorUserInteraction from './DirectorUserInteraction.js'
import DirectorTimer from './DirectorTimer.js'
import Canvas from './Canvas.js'
import Factory from './Factory.js'
import Controls from './interaction/Controls.js'
import StageUserInterface from './interaction/StageUserInterface.js'
import CollisionDetector from "./CollisionDetector"
import AudioPlayerCreateJs from "./AudioPlayerCreateJs"
import AudioPlayerSoundJs from "./AudioPlayerSoundJs"
import DirectorAudio from "./DirectorAudio.js"
import State from "./State.js"
import Timer from "./Timer.js"
import VideoTimer from "./VideoTimer.js"
import CollisionTest from "./CollisionTest";

/**
 * Manages initialization of objects and corresponding dependencies
 */
export default class Container {

  init(sounds) {
    this.sounds = sounds
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
    Object.assign(AudioPlayerSoundJs.prototype, this.getDefaultPrototypeProperties())

    this.initClassMapping()
    this.state = new State()
    this.eventRouting = new EventRouter()
    this.canvas = new Canvas(createjs)
    this.factory = new Factory()
    this.collisionDetector = new CollisionDetector()
    this.audioplayer = new AudioPlayerSoundJs()
    this.controls = new Controls(this.sounds, this.state)
    this.stageUi = new StageUserInterface(this.canvas.stage)
    this.directorUI = new DirectorUserInteraction(this.state, this.factory, this.collisionDetector)
    this.director = new Director(this.canvas, this.factory, this.collisionDetector, this.state)
    this.directorAudio = new DirectorAudio(this.audioplayer, this.sounds)
    this.directorTimer = new DirectorTimer()
    this.collisionTest = new CollisionTest(this.state, this.factory, this.director)
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
        return timer
      },
      'VideoTimer': (args) => {
        let timer = new VideoTimer(args[1], args[2])
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