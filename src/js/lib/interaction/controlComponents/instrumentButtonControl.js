export default class InstrumentButtonControl {

  constructor(sounds) {
    this.sounds = sounds;
    this.elementId = 'instrument-button'
    this.elements = {}
    this.renderInstrumentButtons()
    this.initListeners()
    this.init()
  }

  init() {
    let sound = this.getFirstSound()
    this.activateButton(sound)
    this.Observable.callObservers(
      'onControlsUpdate',
      {
        'property': this.elementId,
        'value': sound
      })
  }

  renderInstrumentButtons() {
    let $container = document.getElementById('instrument-buttons-container');
    for (let sound in this.sounds) {
      let $node = this.createInstrumentNode(sound);
      this.elements[sound] = $node;
      $container.appendChild($node);
    }
  }

  onUpdateControl(property, sound) {
    if (property != this.elementId) {
      return
    }
    this.state.instrument = sound
    if (this.state.activeBar) {
      this.state.activeBar.sound = sound
    }
    this.activateButton(sound)
  }

  onSelectBar(property, bar) {
    this.activateButton(bar.sound)
  }

  activateButton(sound) {
    let $button
    this.deactivateButtons()
    if (sound == 'first') {
      sound = this.getFirstSound()
    }
    $button = this.elements[sound]
    $button.classList.add('btn-selected')
    $button.focus()
  }

  getFirstSound() {
    return Object.keys(this.elements)[0]
  }

  deactivateButtons() {
    let $button;
    for (let index in this.elements) {
      $button = this.elements[index]
      $button.classList.remove('btn-selected')
      $button.blur()
    }
  }

  createInstrumentNode(sound) {
    let $node = document.createElement('button')
    $node.classList.add('btn', 'btn-primary', this.elementId)
    $node.setAttribute('data-sound', sound)
    $node.setAttribute('title', sound)
    $node.onclick = (event) => {
      this.Observable.callObservers(
        'onControlsUpdate',
        {
          'property': this.elementId,
          'value': event.target.dataset.sound
        })
    }
    return $node
  }

  onStartPlaySound(property, sound) {
    let $element = this.elements[sound]
    if ($element) {
      $element.classList.add('button-playing')
      setTimeout(() => {
        $element.classList.remove('button-playing')
      }, 300)
    }
  }

  initListeners() {
    this.Observable.addObserver((args) => {
      this.onUpdateControl(args.property, args.value)
    }, 'onControlsUpdate')

    this.Observable.addObserver((args) => {
      this.onSelectBar(args.property, args.value)
    }, 'onSelectBar')

    this.Observable.addObserver((args) => {
      this.onStartPlaySound(args.property, args.value)
    }, 'onStartPlaySound')
  }
}