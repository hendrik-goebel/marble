import setup from './lib/Setup.js'
import CollisionTest from "./lib/test/CollisionTest.js"
import Container from "./lib/Container.js"

let container = new Container()
container.init()
container.director.audio = container.audioDirector

container.eventRouting.route()

setup.adjustDimensions()
container.controls.initControls()

container.controls.listen()
container.stageUi.listen()
container.canvas.listen()

container.director.init()

container.director.startVideo()
container.director.initAudio()
container.director.startAudio()
