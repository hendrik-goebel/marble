
/**
 *
 * Factories
 */
function Dropper(x, y, maxBalls, ballDx, ballDy, ballColor, ballRadius) {

  this.x = assign(x, m$.config.dropper.x);
  this.y = assign(y, m$.config.dropper.y);
  this.maxBalls = assign(maxBalls, m$.config.dropper.maxBalls);
  this.ballDx = assign(ballDx, m$.config.ball.dx);
  this.ballDy = assign(ballDy, m$.config.ball.dy);
  this.ballColor = assign(ballColor, m$.config.ball.color);
  this.ballRadius = assign(ballRadius, m$.config.ball.radius);
  this.balls = [];
  this.numActiveBalls = 1;
  var i = 0;
  for (i = 0; i < this.maxBalls; i++) {
    this.balls.push(new Ball(this));
  }
}

Dropper.prototype = {
  draw: function () {
    var rect = new createjs.Shape();
    rect.graphics.beginFill(m$.config.dropper.color)
            .drawRect(this.x,
                    this.y,
                    m$.config.dropper.width,
                    m$.config.dropper.height);
    stage.addChild(rect);
  },
  dropBall: function () {
    var i = 0;
    for (i = 0; i < this.balls.length; i++) {
      if (!this.balls[i].active) {
        this.balls[i].active = true;
        break;
      }

    }
  }
};
function Ball(dropper) {

  this.x = dropper.x;
  this.y = dropper.y;
  this.dx = dropper.ballDx;
  this.dy = dropper.ballDy;
  this.color = dropper.ballColor;
  this.radius = dropper.ballRadius;
  this.active = false;
  this.dropper = dropper;
};
Ball.prototype = {
  move: function () {
    if (this.active) {
      this.x += this.dx;
      this.y += this.dy;
    }
  },
  reset: function () {
    this.x = this.dropper.x;
    this.y = this.dropper.y;
    this.dx = m$.config.ball.dx;
    this.dy = m$.config.ball.dy;
    this.active = false;
  },
  draw: function () {
    var circle = new createjs.Shape();
    circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
    circle.x = this.x;
    circle.y = this.y;
    stage.addChild(circle);
  },
  detectColision: function (bars) {

    var colisionOffset = this.radius + 1;

    //detect wall colission
    var colision = detectWallColision(this, {x: 0, y: 0, height: stage.canvas.height, width: stage.canvas.width});
    switch (colision) {
      case 'top':
        this.dy *= -1;
        this.y = colisionOffset;
        break;
      case 'left':
        this.dx *= -1;
        this.x = colisionOffset;
        break;
      case 'bottom':
        this.reset();
        break;
      case 'right':
        this.dx *= -1;
        break;
    }

    if (colision && colision != 'bottom') {
      if (!m$.colided.wall) {
        m$.playSound('wall');
        m$.colided.wall = true;
      }
    } else {
      m$.colided.wall = false;
    }

    //Detect Bar Colision
    if (colision === false) {
      var bar = null;
      for (var b = 0; b < bars.length; b++) {
        bar = bars[b];
        colision = detectObjectColision(this, bar);
        switch (colision) {
          case 'top':
            this.y = bar.y - colisionOffset;
            this.dy *= -1;
            break;
          case 'left':
            this.x = bar.x - colisionOffset;
            this.dx *= -1;
            break;
          case 'bottom':
            this.y = bar.y + bar.height + colisionOffset;
            this.dy *= -1;
            break;
          case 'right':
            this.x = bar.x + bar.width + colisionOffset;
            this.dx *= -1;
            break;
        }
        if (colision !== false) {
          if (!m$.colided.bar) {
            m$.colided.bar = true;
            m$.playSound(bar.sound.name);
          }
        } else {
          m$.colided.bar = false;
        }
      }
    }
  }
};

function Bar(x, y, width, height, color, sound) {
  this.x = assign(x, m$.config.bar.x);
  this.y = assign(y, m$.config.bar.y);
  this.width = assign(width, m$.config.bar.width);
  this.height = assign(height, m$.config.bar.height);
  this.color = assign(color, m$.config.bar.color);
  this.sound = sound
  this.colorSelected =  m$.config.bar.colorSelected;
  this.isSelected = true;
}

Bar.prototype = {
  draw: function (key) {
    if (key == m$.selectedBar) {
      ball.isSelected = true;
      var color = this.colorSelected;
    } else {
      ball.isSelected = false;
      var color = this.color;
    }

    var rect = new createjs.Shape();
    rect.graphics.beginFill(color).drawRect(this.x, this.y, this.width, this.height);

    stage.addChild(rect);
    rect.addEventListener( 'mousedown', function( event ){
      selectBar(key)
    } );

    rect.addEventListener( 'dblclick', function( event ){
      deleteBar(key)
    } );
  }
};


