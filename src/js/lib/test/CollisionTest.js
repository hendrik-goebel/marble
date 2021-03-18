/**
 * creates a series of collision situations for testing purposes
 */
export default class CollisionTest {

  constructor() {
    this.state = 1
  }

  reset(director) {
    let x = setTimeout(function() {
      director.reset()
    }, 1000)
  }


  next(director) {
    if (this.state == 1) {
      console.log("A ball hits a bar on the left top edge")
      director.activeBar = director.factory.createBar(100, 100)
    }
    if (this.state == 2) {
      this.reset(director)
    }
    if (this.state == 3) {
      console.log("A ball hits a bar on the top edge")
      director.activeBar = director.factory.createBar(190, 200)
    }
    if (this.state == 3) {
      console.log("A ball hits the canvas top edge")
    }
    if (this.state == 5) {
      console.log("A ball hits a bar on the left edge")
      director.activeBar = director.factory.createBar(500, 80, 50, 100)
    }
    this.state++
  }
}