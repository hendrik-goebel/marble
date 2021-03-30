import setup from './lib/Setup.js'
import Container from "./lib/Container.js"


let container = new Container()
container.init()
container.director.audio = container.directorAudio
container.eventRouting.route()
setup.adjustDimensions()

container.stageUi.listen()
container.canvas.listen()

container.director.init()

setTimeout(() => {
  container.directorTimer.run()

}, 1000)
