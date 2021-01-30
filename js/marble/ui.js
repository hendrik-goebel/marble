function showUi(m$) {

  var ui = new Vue({
    el: '#ui',
    data: {
      showHelp: false,
      click: m$.settings.global.click,
      quantisation: m$.settings.global.quantisation,
      bpm: m$.config.global.bpm,

      selectedBar:  m$.selectedBar,

      soundBar: m$.sounds[0][1],
      sounds: m$.sounds
    },
    watch: {
      click: function (v) {
        m$.settings['global']['click'] = !m$.settings['global']['click'];
      },
      quantisation: function (v) {
        m$.settings['global']['quantisation'] = !m$.settings['global']['quantisation'];
      },
      bpm: function (v) {
        m$.config['global']['bpm'] = v;
      },
      soundBar: function (sound) {
        m$.soundTable['bar'].name = sound
        m$.bars[this.selectedBar].sound.name = sound
      },
    },
  })

  return ui;
}


