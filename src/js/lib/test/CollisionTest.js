/**
 * creates a serie of collision situations for testing purposes
 */
export default class CollisionTest {

  constructor() {
    this.state = 1
  }

  next(director) {
    if (this.state == 1) {
      director.activeBar = director.factory.createBar(300, 300)

    }

    if (this.state == 2) {
      let x = 150
      let y = 200 - director.setup.bar.minHeight
      director.bars =[]
      director.activeBar = director.factory.createBar(x, y)
    }
    if (this.state == 3) {
      director.collisionDetector.debug = true
      let x = 250
      let y = 300 - director.setup.bar.minHeight
      director.bars =[]
      director.activeBar = director.factory.createBar(x, y)
    }
    this.state++
  }
}