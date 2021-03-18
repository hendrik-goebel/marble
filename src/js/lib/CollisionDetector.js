export default class CollisionDetector {

  constructor() {
    this.debug = false
  }

  detectObjectCollision(subject, object) {

    if (subject.form == 'circle' && object.form == 'rectangle') {
      let result = this.detectCircleWithRectangle(subject, object)

      if (result.position) {
        subject.collide(object, result.position, result.difference)
      }
      return subject
    }
  }

  detectCanvasBorderCollision(subject, object) {
    let collisionPosition = this.detectCircleInsideRectangle(subject, object)
    if (collisionPosition) {
      subject.collide(object, collisionPosition)
    }
    return subject
  }


  /**
   * Detects the colision of two objects
   * object a is a circle with params: x,y,radius
   * object b is a rectangle with params, x, y, width, height
   * @returns {String|Boolean}
   */
  detectCircleWithRectangle(a, b) {

    let testX = a.x
    let testY = a.y
    let position = ''

    /**
     * find closest edge
     */
    if (a.x < b.x) {
      position = "left"
      testX = b.x
    } else if (a.x > b.x + b.width) {
      testX = b.x + b.width
      position = "right"
    }
    if (a.y < b.y) {
      position = "top"
      testY = b.y
    } else if (a.y > b.y + b.height) {
      position = "bottom"
      testY = b.y + b.height
    }

    /**
     * Calculate distance to closest edge
     */
    let distX = a.x - testX;
    let distY = a.y - testY;
    let distance = Math.floor(Math.sqrt((distX * distX) + (distY * distY)));

    let difference = distance - a.radius
    if (distance < a.radius) {

      return {
        'position': position,
        'difference': difference
      };
    }
    return false;
  }


  /**
   * Detects the colision of circle inside a box

   * @param object a circle with params x,y,radius
   * @param object rectangle with params x,y,width,height
   * @returns {undefined} */
  detectCircleInsideRectangle(a, b) {

    let colisionOffset = a.radius

    if (a.y < b.y + colisionOffset) {
      return 'top'
    }
    if (a.x < b.x + colisionOffset) {
      return 'left'
    }
    if (a.y > b.y + b.height - colisionOffset) {
      return 'bottom'
    }
    if (a.x > b.x + b.width - colisionOffset * 2) {
      return 'right'
    }
    return null
  }
}