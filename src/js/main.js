import Director from './lib/Director.js'
import Canvas from './lib/Canvas.js'
import Factory from './lib/Factory.js'
import Controls from './lib/interaction/Controls.js'
import StageUserInterface from './lib/interaction/StageUserInterface.js'
import setup from './lib/Setup.js'
import CollisionDetector from "./lib/CollisionDetector"
import EventRouting from './lib/EventRouting.js'
import CollisionTest from "./lib/test/CollisionTest.js"
import {Observable} from "./lib/helper/ObservableMixin.js"

// Add observer mixins
Object.assign(Controls.prototype, {Observable})
Object.assign(StageUserInterface.prototype, {Observable})
Object.assign(Director.prototype, {Observable})
Object.assign(Canvas.prototype, {Observable})

// init objects and dependencies
const container = {}
container.canvas = new Canvas(createjs)
container.factory = new Factory(setup)
container.collisionDetector = new CollisionDetector()
container.director = new Director(setup, container.canvas, container.factory, container.collisionDetector)
container.controls = new Controls(setup)
container.stageUi = new StageUserInterface(createjs, container.canvas.stage)
if (setup.mode.test) {
  container.collisionTest = new CollisionTest()
}
const eventRouting = new EventRouting(container, setup)

// run init methods
eventRouting.route()

setup.adjustDimensions()
container.controls.initControls()

container.controls.listen()
container.stageUi.listen()
container.canvas.listen()

// start video ticker
container.director.tick()
createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener('tick', () => container.director.tick())

container.director.init()
