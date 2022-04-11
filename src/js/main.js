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
      'stick' : "samples/0stick.ogg",
      'kick' : "samples/bassdrum.ogg",
      'kick2' : "samples/kickdeep.ogg",
      'bell' : "samples/bell.ogg",
      'hihat-close' : "samples/hihat-close.ogg",
      'hihat2' : "samples/hihat2.ogg",
      'hihat3' : "samples/hihat3.ogg",
      'snare' : "samples/snare.ogg",
      'snare2' : "samples/snare2.ogg",
      'snare3' : "samples/snare3.ogg",
      'roll' : "samples/roll.ogg",
      'tom1' : "samples/tom1.ogg",

      'tom3' : "samples/tom3.ogg",
      'tom4' : "samples/tom4.ogg",
      'tom5' : "samples/tom5.ogg",
      'tom-bassdrum' : "samples/tom-bassdrum.ogg",
      'sound1' : "samples/sound1.ogg",
      'sound2' : "samples/sound2.ogg",
      'sound3' : "samples/sound3.ogg",
      'sound4' : "samples/sound4.ogg",
      'sound5' : "samples/sound5.ogg",
      'sound6' : "samples/sound6.ogg",
      'sound7' : "samples/sound7.ogg",
      'sound8' : "samples/sound8.ogg",
      "silence": ""

    }
    init(sounds)
  }
  getSounds()
});


