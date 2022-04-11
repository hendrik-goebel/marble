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

    // You need to load your own samples here.
    // Format: { name: url_to_mp3, name2: url_to_another_mp3, ...}
    let sounds = {
      'stick' : "samples/0stick.mp3",


      'hihat-close' : "samples/hihat-close.mp3",
      'hihat-close2' : "samples/hihat-close2.mp3",
      'hihat2' : "samples/hihat2.mp3",
      'hihat3' : "samples/hihat3.mp3",
      'hihat1' : "samples/hihat1.mp3",
      'bell' : "samples/bell.mp3",
      'kick1' : "samples/kick1.mp3",
      'kick2' : "samples/kick2.mp3",

      'kickdeep' : "samples/kickdeep.mp3",
      'snare1' : "samples/snare1.mp3",
      'snare2' : "samples/snare2.mp3",
      'snare3' : "samples/snare3.mp3",
      'tom1' : "samples/tom1.mp3",
      'tom2' : "samples/tom2.mp3",
      'tom3' : "samples/tom3.mp3",
      'tom4' : "samples/tom4.mp3",
      'tom-roll' : "samples/tom-roll.mp3",

      'crash1' : "samples/crash1.mp3",
      'crash2' : "samples/crash2.mp3",
      'sound1' : "samples/sound1.mp3",
      'sound2' : "samples/sound2.mp3",
      'sound3' : "samples/sound3.mp3",
      'sound4' : "samples/sound4.mp3",
      'sound5' : "samples/sound5.mp3",
      'eguitar1' : "samples/eguitar1.mp3",
      'eguitar2' : "samples/eguitar2.mp3",
      'eguitar3' : "samples/eguitar3.mp3",


      "silence": ""

    }
    init(sounds)
  }
  getSounds()
});


