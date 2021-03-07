import Director from './lib/Director.js'
import Canvas from './lib/Canvas.js'
import Factory from './lib/Factory.js'
import Controls from './lib/Controls.js'
import setup from './lib/Setup.js'

const canvas = new Canvas(createjs)
const factory = new Factory(setup)
const director = new Director(setup, canvas, factory)
const controls = new Controls(setup)

// Canvas Dimensions
setup.adjustDimensions()
window.onresize = function() {
  let canvasDimensions = canvas.resize()
  director.updateCanvasSize(canvasDimensions.width, canvasDimensions.height)
}

// Control event handling
controls.initControls()
let onControlsUpdate = function(type, property, value) {
  director.changeObjectProperty(type, property, value)
  controls.updateControl(property, value)
}

controls.addObserver(onControlsUpdate)
controls.listen()

// Video tick
director.tick()
createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener('tick', tickVideo)

function tickVideo() {
  director.tick()
}
