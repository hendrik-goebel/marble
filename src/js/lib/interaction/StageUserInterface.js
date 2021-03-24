export default class StageUserInterface {

  constructor(stage) {
    this.stage = stage
    this.timepoint = null
  }

  /**
   * Listens for mouse (or touch) events on the canvas and translates them to the
   * internel event system
   */
  listen() {
    let Observable = this.Observable
    let timepoint = this.timepoint
    let clickCounter = 0
    let clickType = ''
    this.stage.on("stagemousedown", function (evt) {

      // detect single or double click type
      let singleClickTimer = setTimeout(function () {
        if (clickCounter == 1) {
          clickCounter = 0
          singleClick()
        }
        clickCounter = 0
      }, 200);
      clickCounter++
      if (clickCounter > 1) {
        doubleClick()
      }

      function singleClick() {
        Observable.callObservers('onSingleClick', {
          'x': evt.stageX,
          'y': evt.stageY
        })
      }

      function doubleClick() {
        Observable.callObservers('onDoubleClick', {
          'x': evt.stageX,
          'y': evt.stageY
        })

      }
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