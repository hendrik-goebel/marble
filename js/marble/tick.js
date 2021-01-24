function tick() {

  var ticker = 0;
  var time = 1;
  var beat = 0;
  var beatcount = 0;
  var is4 = true;
  var is8 = true;
  var is16 = true;

  var tickAudio = function () {

    ticker++;
    beat++;
    if (beat > m$.config.global.measure1) {
      beat = 1;
      beatcount++;
    }
    if (ticker > 16) {
      ticker = 1;
    }

    ticker % 4 == 0 ? is8 = true : is8 = false;
    ticker % 8 == 0 ? is4 = true : is4 = false;
    is16 = true;
    if (is4) {
      m$.dropBalls();
    }

    if (m$.config.global.quantizationTime == 4 && is4) {
      playSoundInTime();
    }

    if (m$.config.global.quantizationTime == 8 && is8) {
      playSoundInTime();
    }

    if (m$.config.global.quantizationTime == 16 && is16) {
      m$.playSoundInTime();
    }

    if (m$.settings.global.click && is4) {
      m$.playSound("click")
    }
  };

  var tickVideo = function () {

    stage.removeAllChildren();
    m$.droppers.forEach(function (dropper) {
      dropper.draw();
      for (key in dropper.balls) {
        ball = dropper.balls[key];
        ball.detectColision(m$.bars);
        ball.move();
        ball.draw();
      };
    });

    for (barKey in m$.bars) {
      bar = m$.bars[barKey];
      bar.draw(barKey);
    }

    stage.update();
  };

  /**
   * Clock function based on http://www.sitepoint.com/creating-accurate-timers-in-javascript/
   *
   * @param string timeGrid
   * @param function tickFunction
   * @returns {undefined}
   */
  var Clock = function (timeGrid, tickFunction) {
    var start = new Date().getTime();
    var time = 0;

    function instance() {
      time += timeGrid;
      var diff = (new Date().getTime() - start) - time;
      tickFunction();
      window.setTimeout(instance, (timeGrid - diff));
    }
    window.setTimeout(instance, timeGrid);
  };
  var videoClock = new Clock(1000 / m$.config.global.fps, tickVideo);
  var audioClock = new Clock((1000 * 60 / m$.config.global.bpm) / 4, tickAudio);

}
