import setup from './lib/Setup.js'
import Container from "./lib/Container.js"
import { Carousel } from 'bootstrap';

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
      'stick' : "samples/0stick.ogg",
      'kick1' : "samples/kick1.ogg",
      'kick2' : "samples/kick2.ogg",
      'kickdeep' : "samples/kickdeep.ogg",
      'tom' : "samples/kick3.ogg",
      'bell' : "samples/bell.ogg",
      'hihat' : "samples/hihat.ogg",
      'hihat2' : "samples/hihat2.ogg",
      'hihat3' : "samples/hihat3.ogg",
      'roll' : "samples/roll.ogg",
      'snare1' : "samples/snare1.ogg",
      'snare2' : "samples/snare2.ogg",
      'splash' : "samples/splash.ogg",
      'splash2' : "samples/splash2.ogg",
      'pling' : "samples/pling.ogg"
    }
    init(sounds)
  }
  getSounds()
});


