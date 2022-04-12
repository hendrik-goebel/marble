import setup from './lib/Setup.js'
import Container from './lib/Container.js'
import { Carousel } from 'bootstrap'

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
    fetch('js/sounds.json')
        .then(response => response.json())
        .then(sounds => init(sounds));
  }
  getSounds()
});



