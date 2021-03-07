export default  {
  'world': {
    'width': null,
    'height': null
  },
  'dropper': {
    'width': 8,
    'height': 8,
    'maxBalls': 20,
    'x': 500,
    'y': 0,
    'radius': 5
  },
  'ball': {
    'width': 5,
    'height': 5,
    'x': 100,
    'y': 0,
    'radius': 5,
    'speed': 1
  },

  'adjustDimensions' : function() {
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