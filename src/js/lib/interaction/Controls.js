/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor() {
    this.controls = {
      'speed': document.getElementById('control-speed'),
      'barSelected': document.getElementById('bar-selected'),
      'grid': document.getElementById('control-grid')
    }
  }

  initControls() {
    this.controls['speed'].value = this.setup.ball.speed
    this.controls['grid'].value = this.setup.system.grid
  }

  listen() {
    this.speed()
    this.grid()
  }

  updateControl(property, value) {
    this.controls[property].value = value
  }

  grid() {
    let Observable = this.Observable
    this.controls['grid'].onchange = function (input) {
      Observable.callObservers(
        'onControlsUpdate',
        {
          'property': 'grid',
          'value': parseFloat(this.value)
        })
    }
  }

  speed() {
    let Observable = this.Observable
    this.controls['speed'].onchange = function (input) {
      Observable.callObservers(
        'onControlsUpdate',
        {
          'property': 'speed',
          'value': parseInt(this.value)
        })
    }
  }
}