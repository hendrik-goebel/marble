import AudioClock from "./AudioClock.js"
import {Observable} from "./helper/ObservableMixin";
import EventRouter from "./EventRouting";
import setup from "./Setup";

import Director from './Director.js'
import Canvas from './Canvas.js'
import Factory from './Factory.js'
import Controls from './interaction/Controls.js'
import StageUserInterface from './interaction/StageUserInterface.js'
import CollisionDetector from "./CollisionDetector"
import CollisionTest from "./test/CollisionTest.js"
import AudioPlayer from "./AudioPlayer"
import AudioDirector from "./AudioDirector.js"

export default class Container {

  init() {
    this.setup = setup
    Object.assign(AudioClock.prototype, this.getDefaultPrototypes())
    Object.assign(Controls.prototype, this.getDefaultPrototypes())
    Object.assign(StageUserInterface.prototype, this.getDefaultPrototypes())
    Object.assign(Director.prototype, this.getDefaultPrototypes())
    Object.assign(Canvas.prototype, this.getDefaultPrototypes())
    Object.assign(AudioDirector.prototype, this.getDefaultPrototypes())
    Object.assign(EventRouter.prototype, this.getDefaultPrototypes())
    Object.assign(Factory.prototype, this.getDefaultPrototypes())

    this.initClassMapping()
    this.eventRouting = new EventRouter()
    this.canvas = new Canvas(createjs)
    this.factory = new Factory()
    this.collisionDetector = new CollisionDetector()
    this.audioplayer = new AudioPlayer()
    this.controls = new Controls()
    this.stageUi = new StageUserInterface(this.canvas.stage)
    this.audioplayer = new AudioPlayer()
    this.director = new Director(this.canvas, this.factory, this.collisionDetector, createjs)
    this.audioDirector = new AudioDirector(this.audioplayer)
  }

  getDefaultPrototypes() {
    return {
      'Observable': Observable,
      'container': this,
      'setup': this.setup
    }
  }

  initClassMapping() {
    this.classMapping = {
      'AudioClock': (args) => {
        let audioClock = new AudioClock(args)
        this.eventRouting.assignAudioClockEvents(audioClock)
        return audioClock
      }
    }
  }

  create(className, ...args) {
    if (className in this.classMapping) {
      return this.classMapping[className](arguments[1])
    }
  }
}