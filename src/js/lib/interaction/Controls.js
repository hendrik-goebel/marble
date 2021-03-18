/**
 * Reacts to changes in the controls ui section
 * Calls observers: onControlsUpdate
 *
 */
export default class Controls {

  constructor(setup) {
    this.setup = setup
    this.controls = {
      'speed': document.getElementById('control-speed')
    }
  }

  initControls() {
    this.controls['speed'].value = this.setup.ball.speed

  }

  listen() {
    this.speed()
  }

  updateControl(property, value) {
    this.controls[property].value = value
  }

  speed() {
    let Observable = this.Observable
    this.controls['speed'].onchange = function (input) {
      Observable.callObservers(
        'onControlsUpdate',
        {
          'entity': 'ball',
          'property': 'speed',
          'value': parseInt(this.value)
        })
    }
  }
}