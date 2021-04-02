import setup from './lib/Setup.js'
import Container from "./lib/Container.js"


function init(sounds) {

  let container = new Container()
  container.init(sounds)
  container.director.audio = container.directorAudio
  container.eventRouting.route()
  setup.adjustDimensions()

  container.stageUi.listen()
  container.canvas.listen()
  container.director.init()
}

document.addEventListener("DOMContentLoaded", function (event) {
  function getSounds() {

    // You need to load your own samples here.
    // Format: { name: url_to_mp3, name2: url_to_another_mp3, ...}
    let sounds = {
      '0Shaker' : "samples/0Shaker.mp3"
    }
    init(sounds)
  }
  getSounds()
});


