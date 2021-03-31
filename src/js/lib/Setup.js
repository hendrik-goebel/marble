export default {
  'world': {
    'width': null,
    'height': null
  },
  'dropper': {
    'width': 8,
    'height': 8,
    'maxBalls': 30,
    'x': 10,
    'y': 10,
    'radius': 5,
    'color': '#dad7cd'
  },
  'ball': {
    'width': 5,
    'x': 10,
    'y': 10,
    'radius': 5,
    'speed': 1,
    'color': '#dad7cd'
  },
  'bar': {
    'minWidth': 10,
    'minHeight': 10,
    'color': "#a3b18a",
    'colorSelected': "#dad7cd"
  },
  'mode': {
    'test': false,
    'profile': true
  },
  'system': {
    'audio': {
      'bpm': 120,
      'bpmMin': 30,
      'bpmMax': 190,
      'note': 16,
    },
    'video': {
      'baseTickTime': 100,
    },
  },
  'adjustDimensions': function () {
    let $canvas = document.getElementById('canvas')
    let $canvasContainer = document.getElementById('canvas-container')
    let containerWidth = $canvasContainer.offsetWidth
    let containerHeight = $canvasContainer.offsetHeight
    $canvas.setAttribute('width', containerWidth)
    $canvas.setAttribute('height', containerHeight)
    this.world.width = containerWidth
    this.world.height = containerHeight
  }
}