function showUi(m$) {

  var ui = new Vue({
    el: '#ui',
    data: {
      click: m$.settings.global.click,
      quantisation: m$.settings.global.quantisation,
      bpm: m$.config.global.bpm,

      selectedBar:  m$.selectedBar,

      soundBar: 'shaker-analog',
      sounds: [
        {key: 'shaker-analog', name: 'shaker-analog'},
        {key: 'shaker-suckup', name: 'shaker-suckup'},
        {key: 'hihat-plain', name: 'HiHat Plain'},
        {key: 'perc-short', name: 'perc-short'},
        {key: 'perc-tribal', name: 'perc-tribal'},
        {key: 'perc-weirdo', name: 'perc-weirdo'},
        {key: 'tom-808', name: 'tom-808'},
        {key: 'tom-short', name: 'tom-short'},
        {key: 'cowbell-808', name: 'cowbell-808'},
        {key: 'clap-analog', name: 'clap-analog'},
        {key: 'snare-electro', name: 'snare-electro'},
        {key: 'perc-laser', name: 'Laser'},
        {key: 'kick-808', name: 'Kick 808'},
        {key: 'kick-classic', name: 'Kick Classic'},
      ]
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
      soundBar: function (v) {
        m$.soundTable['bar'].name = v
      },

    },
    methods: {}
  })

}


