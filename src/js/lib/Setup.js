export default {
  'world': {
    'width': null,
    'height': null
  },
  'dropper': {
    'width': 8,
    'height': 8,
    'maxBalls': 1,
    'x': 500,
    'y': 0,
    'radius': 5
  },
  'ball': {
    'width': 5,
    'x': 100,
    'y': 0,
    'radius': 5,
    'speed': 1
  },
  'bar': {
    'minWidth': 50,
    'minHeight': 10,
  },
  'mode': {
    'collisionTest': false
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