import AbstractEntity from './AbstractEntity.js'

export default class Bar extends AbstractEntity {

  constructor(setup) {
    super(setup)
    this._setup = setup;
    this.type = 'bar'
    this.form = 'rectangle'
    this.width = setup.minWidth
    this.height = setup.minHeight
    this.minWidth = setup.minWidth;
    this.minHeight = setup.minHeight;
    this.activate()
  }
}
