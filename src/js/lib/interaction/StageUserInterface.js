export default class StageUserInterface {

  constructor(stage) {
    this.stage = stage
  }

  /**
   * Listens for mouse (or touch) events on the canvas and translates them to the
   * internel event system
   */
  listen() {
    let Observable = this.Observable
    this.stage.on("stagemousedown", function (evt) {
      Observable.callObservers('onMouseDown', {
        'x': evt.stageX,
        'y': evt.stageY
      })
    });

    this.stage.on("stagemouseup", function (evt) {
      Observable.callObservers('onMouseUp', {
        'x': evt.stageX,
        'y': evt.stageY
      })
    });

    this.stage.on("stagemousemove", function (evt) {

        Observable.callObservers('onMouseMove', {
          'x': evt.stageX,
          'y': evt.stageY
        })
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