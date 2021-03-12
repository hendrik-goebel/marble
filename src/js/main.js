import Director from './lib/Director.js'
import Canvas from './lib/Canvas.js'
import Factory from './lib/Factory.js'
import Controls from './lib/interaction/Controls.js'
import StageUserInterface from './lib/interaction/StageUserInterface.js'
import setup from './lib/Setup.js'
import CollisionDetector from "./lib/CollisionDetector"
import CollisionTest from "./lib/test/CollisionTest.js"

const canvas = new Canvas(createjs)
const factory = new Factory(setup)
const collisionDetector = new CollisionDetector()
const director = new Director(setup, canvas, factory, collisionDetector)
const controls = new Controls(setup)
const stageUi = new StageUserInterface(createjs, canvas.stage)

// Canvas Dimensions
setup.adjustDimensions()
window.onresize = function () {
  let canvasDimensions = canvas.resize()
  director.updateCanvasSize(canvasDimensions.width, canvasDimensions.height)
}


// Control event handling
controls.initControls()
let onControlsUpdate = function (type, property, value) {
  director.changeObjectProperty(type, property, value)
  controls.updateControl(property, value)
}
controls.addObserver(onControlsUpdate)
controls.listen()

let onStageUpdate = function (type, x, y) {
  if (type == 'debug') {
    director.debug()
    director.collisionDetector.debug = true
  }
  director.updateCanvasEvent(type, x, y)
}
stageUi.addObserver(onStageUpdate)
stageUi.listen()



// Video tick
director.tick()
createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener('tick', () => director.tick())


if (setup.mode.collisionTest) {
  let collisionTest = new CollisionTest();
  let collisionTestFunction = function (object) {
    collisionTest.next(object)
  }
  director.addObserver(collisionTestFunction, 'afterInit')
  director.addObserver(collisionTestFunction, 'afterCollision')
}

director.init()


