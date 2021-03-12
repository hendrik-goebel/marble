export default class CollisionDetector {

  constructor() {
    this.debug = false
  }

  detectObjectCollision(subject, object) {

    if (subject.form == 'circle' && object.form == 'rectangle') {
      let collisionPosition = this.detectCircleWithRectangle(subject, object)
      if (collisionPosition) {
        subject.collide(object, collisionPosition)
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

    let cx = a.x
    let cy = a.y

    let rx = b.x
    let ry = b.y
    let rw = b.width
    let rh = b.height
    let radius = a.radius

    let testX = cx
    let testY = cy

    let position =''

    // which edge is closest?
    if (cx < rx) {
      position="left"
      testX = rx
       }
    else if (cx > rx+rw){
      testX = rx+rw
      position="right"
    }
    if (cy < ry) {
      position = "top"
      testY = ry
    } else if (cy > ry+rh) {
      position = "bottom"
      testY = ry+rh
    }

    // get distance from closest edges
    let distX = cx-testX;
    let distY = cy-testY;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );


    // if the distance is less than the radius, collision!
    if (distance < radius) {

      return position;
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