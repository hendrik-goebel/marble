export default class StageUserInterface {

  constructor(createjs, stage) {
    this.createjs = createjs
    this.stage = stage
    this.observers = []
  }

  listen() {
    let Observable = this.Observable
    let isDrawingBar = false
    this.stage.on("stagemousedown", function (evt) {
      isDrawingBar = true
      Observable.callObservers('onStartDrawBar', {
        'x': evt.stageX,
        'y': evt.stageY
      })

    });
    this.stage.on("stagemouseup", function (evt) {
      isDrawingBar = false
      Observable.callObservers('onStopDrawBar', {
        'x': evt.stageX,
        'y': evt.stageY
      })
    });
    this.stage.on("stagemousemove", function (evt) {
      if (isDrawingBar) {
        Observable.callObservers('onMouseMove', {
          'x': evt.stageX,
          'y': evt.stageY
        })
      }
    });

    document.onkeyup = keyup;

    function keyup(event) {
      if (event.key == "d") {
        Observable.callObservers('onKeyUp', {
          'key': event.key,
        })
      }
    }
  }
}