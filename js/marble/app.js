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
  var soundTable = {
    'click': {'name': 'Closedhat19', 'active': true, 'source': '', panning: 0},
    'wall': {'name': 'wall', 'active': false, 'source': '', panning: 0},
    'bar': {'name':  sounds[0][1], 'active': false, 'source': '', panning: 0}
  }
  sounds.forEach(function (sound) {
    createjs.Sound.registerSound(sound[0], sound[1]);
    soundTable[sound[1]] = {'name': sound[1], 'active': false, 'source': '', panning: 0}
  })

  sounds.push(["Silent", "Silent"])

  /**
   * Application Setup
   */
  m$ = {
    sounds: sounds,
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
        'colorSelected': '#dad7cd'
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
    soundTable: soundTable,

    playSound: function (sound) {
      if (m$.soundTable[sound] == undefined) {
        return 0;
      }
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
  m$.ui = showUi(m$);
}

