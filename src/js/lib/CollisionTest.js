/**
 * creates a series of collision situations for testing purposes
 */
export default class CollisionTest {

  constructor(state, factory, director) {
    this.appState = state
    this.factory = factory
    this.director = director
    this.state = 1
  }

  reset() {
    let director = this.director
    let obj = this
    let x = setTimeout(function() {
      director.reset()
      obj.next()
    }, 1000)
  }

  next(director) {
    if (this.state == 1) {
      console.log("A ball hits a bar on the left top edge")
      let bar = this.factory.createBar(100, 100, 100)
      this.appState.addBar(bar)
    }
    if (this.state == 2) {
      this.reset()
    }
    if (this.state == 3) {
      console.log("A ball hits a bar on the top edge")
      let bar = this.factory.createBar(190, 200, 100)
      this.appState.addBar(bar)
    }
    if (this.state == 3) {
      this.reset()
    }
    if (this.state == 5) {
      console.log("A ball hits a bar on the left edge")
      director.activeBar = director.factory.createBar(500, 80, 50, 100)
      let bar = this.factory.createBar(500, 80, 50, 200)
      this.appState.addBar(bar)
    }
    this.state++
  }
}