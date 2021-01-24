

/**
 * Detects the colision of two objects
 * object a is a circle with params: x,y,radius
 * object b is a rectangle with params, x, y, width, height
 * @returns {String|Boolean}
 */
detectObjectColision = function (a, b) {

  var colisionOffset = a.radius + 1;
  var colision = false;
  if (((a.x > b.x) && (a.x < b.x + b.width)) &&
          ((a.y > b.y - colisionOffset) && (a.y < b.y))
          ) {
    colision = 'top';
  } else

  if ((a.x + colisionOffset > b.x) && (a.x < b.x + colisionOffset) &&
          ((a.y > b.y) && (a.y < b.y + b.height))) {
    colision = 'left';
  } else

  if (((a.x > b.x) && (a.x < b.x + b.width)) &&
          ((a.y > (b.y + b.height)) && (a.y < (b.y + b.height) + colisionOffset))) {
    colision = 'bottom';
  } else

  if ((a.x > b.x + b.width) && (a.x < b.x + b.width + colisionOffset) &&
          (a.y > b.y) && (a.y < b.y + b.height)) {
    colision = 'right';
  } else

  if ((a.x > b.x) && (a.x < b.x + b.width) &&
          (a.y > b.y) && (a.y < b.y + b.height)
          ) {
    colision = colision = 'inside';
  }

  return colision;
};


/**
 * Detects the colision of circle inside a box
 
 * @param object a circle with params x,y,radius
 * @param object rectangle with params x,y,width,height
 * @returns {undefined} */
detectWallColision = function (a, b) {

  var colisionOffset = a.radius;
  var colision = false;

  //detect wall colission  
  if (a.y < b.y + colisionOffset) {
    colision = 'top';
  } else
  if (a.x < b.x + colisionOffset) {
    colision = 'left';
  } else
  if (a.y > b.y + b.height - colisionOffset) {
    colision = 'bottom';
  } else
  if (a.x > b.x + b.width - colisionOffset * 2) {
    colision = 'right';
  }
  return colision;
};

