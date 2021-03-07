export default class Controls {

  constructor(setup) {
    this.setup = setup
    this.observers = []
    this.controls = {
      'speed' : document.getElementById('control-speed')
    }
  }

  initControls() {
    this.controls['speed'].value = this.setup.ball.speed

  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  listen() {
    this.speed()
  }

  updateControl(key, value) {
    this.controls[key].value = value
  }
  speed() {
    let observers = this.observers
    this.controls['speed'].onchange = function (input) {
      for (let observer of observers) {
        let value = parseInt(this.value)
        observer('ball', 'speed', value)
      }
    }
  }

}