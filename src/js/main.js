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
      '0stick' : "samples/0stick.ogg",
      'kick1' : "samples/kick1.ogg",
      'kick2' : "samples/kick2.ogg",
      'kick3' : "samples/kick3.ogg",
      'bell' : "samples/bell.ogg",
      'hihat' : "samples/hihat.ogg",
      'roll' : "samples/roll.ogg",
      'snare1' : "samples/snare1.ogg",
      'splash' : "samples/splash.ogg"

    }
    init(sounds)
  }
  getSounds()
});


