export default class StageUserInterface {

  constructor(createjs, stage) {
    this.createjs = createjs
    this.stage = stage
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  listen() {
    let observers = this.observers
    let isDrawingBar = false
    this.stage.on("stagemousedown", function (evt) {
      for (let observer of observers) {
        isDrawingBar = true
        observer('startDrawBar', evt.stageX, evt.stageY)
      }
    });
    this.stage.on("stagemouseup", function (evt) {
      isDrawingBar = false
      for (let observer of observers) {
        observer('stopDrawBar', evt.stageX, evt.stageY)
      }
    });
    this.stage.on("stagemousemove", function (evt) {
      if (isDrawingBar) {
        for (let observer of observers) {
          observer('drawingBar', evt.stageX, evt.stageY)

        }
      }
    });

    document.onkeyup = keyup;
    function keyup(event) {
      if (event.key == "d") {
        for (let observer of observers) {
          observer('debug')
        }
      }
    }
  }
}