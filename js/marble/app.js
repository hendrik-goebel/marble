function marble(scope, element, attribute) {
  /**
   * Stage Setup
   */
  stage = new createjs.Stage("main-canvas");
  createjs.Touch.enable(stage);
  window.addEventListener('resize', resize, false);

  function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = 800;
  }
  resize();
  /**
   * Audio Setup
   *
   */
  createjs.Sound.registerSound("samples/hihat-plain.wav", "hihat-plain");
  createjs.Sound.registerSound("samples/kick-classic.wav", "kick-classic");
  createjs.Sound.registerSound("samples/kick-808.wav", "kick-808");
  createjs.Sound.registerSound("samples/perc-laser.wav", "perc-laser");
  createjs.Sound.registerSound("samples/clap-analog.wav", "clap-analog");
  createjs.Sound.registerSound("samples/cowbell-808.wav", "cowbell-808");
  createjs.Sound.registerSound("samples/perc-short.wav", "perc-short");
  createjs.Sound.registerSound("samples/shaker-analog.wav", "shaker-analog");
  createjs.Sound.registerSound("samples/perc-tribal.wav", "perc-tribal");
  createjs.Sound.registerSound("samples/perc-weirdo.wav", "perc-weirdo");
  createjs.Sound.registerSound("samples/shaker-suckup.wav", "shaker-suckup");
  createjs.Sound.registerSound("samples/snare-electro.wav", "snare-electro");
  createjs.Sound.registerSound("samples/tom-808.wav", "tom-808");
  createjs.Sound.registerSound("samples/tom-short.wav", "tom-short");

  /**
   * Application Setup
   */
  m$ = {
    'selectedBar': 0,
    settings: {
      'global': {
        'audio': true,
        'quantisation': true,
        'click': true
      },
      'edit': {
        'tool': 'bar'
      },
      'sound': {
        'click': 'hihat-plain'
      }
    },
    config: {
      'global': {
        'bpm': 120,
        'fps': 30,
        'quantizationTime': 16,
        'measure1': 4
      },
      'ball': {
        'x': stage.canvas.width / 2,
        'y': 11,
        'dx': 4,
        'dy': 4,
        'color': '#dad7cd',
        'radius': 15
      },
      'dropper': {
        'x': stage.canvas.width / 2,
        'y': 20,
        'color': 'green',
        'width': 10,
        'height': 2,
        'maxBalls': 50,
        'newBallFrequency': 4,
        'balls': []
      },
      'bar': {
        'x': 500,
        'y': 250,
        'width': 540,
        'height': 50,
        'color': '#a3b18a',
        'colorSelected': '#a3b18a'
      }
    },
    // Visuals
    bars: [],
    droppers: [],
    balls: [],
    speed: 0,
    activeBarIndex: false,
    actItem: false,
    actItemType: false,

    dropBalls: function () {
      m$.droppers.forEach(function (dropper) {
        dropper.dropBall();
      });
    },
    // Colision
    colided: {
      bar: false,
      wall: false,
      wall2: false
    },
    // Audio
    audioEventBuffer: [],
    soundTable: {
      'click': {'name': 'hihat-plain', 'active': true, 'source': '', panning: 0},
      'wall': {'name': 'wall', 'active': false, 'source': '', panning: 0},
      'bar': {'name': 'shaker-analog', 'active': false, 'source': '', panning: 0}
    },

    playSound: function (sound) {
      if (m$.settings.global.audio) {
        if (m$.settings.global.quantisation) {
          m$.soundTable[sound].active = true;
        } else {
          createjs.Sound.play(m$.soundTable[sound].name, {interrupt: createjs.Sound.INTERRUPT_ANY});
        }
      }
    },
    playSoundInTime: function () {
      if (m$.settings.global.audio) {
        var key;
        for (key in m$.soundTable) {
          if (m$.soundTable[key].active) {
            m$.soundTable[key].active = false;
            createjs.Sound.play(m$.soundTable[key].name, {interrupt: createjs.Sound.INTERRUPT_ANY});
          }
        }
      }
    },
  };

  m$.speed = m$.config.global.bpm / 100;
  m$.config.ball.dx = m$.config.ball.dx;
  m$.config.ball.dy = m$.config.ball.dy;

  /*
   * run!
   */
  m$.droppers.push(new Dropper());
  interaction();
  tick();
  showUi(m$);
}

