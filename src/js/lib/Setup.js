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
    'colorSelected': "#dad7cd",
    'collisionSpeed': 1
  },
  'mode': {
    'test': false,
    'profile': false
  },
  'system': {
    'audio': {
      'bpm': 120,
      'bpmMin': 30,
      'bpmMax': 190,
      'quantisation': 16,
    },
    'video': {
      'baseTickTime': 100,
    },
  },
  'adjustDimensions': function () {
    let $canvas = document.getElementById('canvas')
    this.world.width = $canvas.offsetWidth
    this.world.height = $canvas.offsetHeight
  }
}