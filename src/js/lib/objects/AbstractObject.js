export default class AbstractObject {
  constructor(setup) {
    this.setup = setup
    this.width = setup.width
    this.height = setup.height
    this.x = setup.x
    this.y = setup.y
    this.isVisible = true
  }

  /**
   * abstract
   */
  move() {
  }
}