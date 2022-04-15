export default class Launcher {
  constructor() {
    this.initElements()
    this.initListeners()
    this.addEvents()
  }

  initElements() {
    this.playButtonElements = document.querySelectorAll('[data-id="playButton"]')
    this.playIconElements = document.querySelectorAll('[data-id="playIcon"]')
  }

  updateIcon() {
    let addClass = 'fa-play'
    let removeClass = 'fa-pause'
    if (this.state.isPlaying == true) {
      addClass = 'fa-pause'
      removeClass = 'fa-play'
    }

    for (let playIconElement of this.playIconElements) {
      playIconElement.classList.remove(removeClass)
      playIconElement.classList.add(addClass)
    }
  }

  onPlay() {
    this.state.hasStarted = true
    this.state.isPlaying = !this.state.isPlaying
    this.updateIcon()
    this.Observable.callObservers('onControlsUpdate', {
      'property': 'play',
      'value': this.state.isPlaying
    })
  }

  addEvents() {
    for (let playButtonElement of this.playButtonElements) {
      playButtonElement.onclick = (event) => {
        this.onPlay()
      }
    }
  }

  onControlsUpdate() {
    if (this.state.hasStarted == false) {
      this.onPlay()
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onControlsUpdate(args.property, args.value)
    }, 'onControlsUpdate')
  }
}