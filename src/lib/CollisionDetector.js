import constants from '../lib/Constants.js'

export default class CollisionDetector {

  detectObjectCollision(subject, object) {
    if (subject.form == constants.FORM.CIRCLE && object.form == constants.FORM.RECTANGLE) {
      let result = this.detectCircleWithRectangle(subject, object)

      if (result.position) {
        object.collide(subject, result.position, result.difference, result.subPosition)
        subject.collide(object, result.position, result.difference, result.subPosition)
      }
      return [subject, object]
    }
  }

  detectCanvasBorderCollision(subject, object) {
    let collisionPosition = this.detectCircleInsideRectangle(subject, object)
    if (collisionPosition) {
      subject.collide(object, collisionPosition)
    }
    return subject
  }

  detectClickCollision(subject, object) {
    if (this.detectPointInsideRectangle(subject, object)) {
      return object
    }
    return null
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
    let subPosition = ''

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
      //calculate the more specific subPosition
      if (position == 'top' || position == 'bottom') {
        let center = ((b.width - b.x) / 2) + b.x;
        if ((a.x + a.radius) < center) {
          subPosition = 'left'
        }
        if ((a.x - a.radius) >= center) {
          subPosition = 'right'
        }
      }

      if (position == 'left' || position == 'right') {
        let center = ((b.height - b.y) / 2) + b.y
        if ((a.y + a.radius) < center) {
          subPosition = 'top'
        }
        if ((a.y + a.radius) >= center) {
          subPosition = 'bottom'
        }
      }

      return {
        'position': position,
        'subPosition': subPosition,
        'difference': difference
      }
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

  /**
   * Detects the collision of a point inside a rectangle
   *
   * @param object a a point with params x,y
   * @param object b a rectangle with params x,y,width, height
   */
  detectPointInsideRectangle(a, b) {

    if (a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height) {
      return true
    }
    return false
  }
}