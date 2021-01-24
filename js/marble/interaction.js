/**
 * Will be called from the bar Object click handler
 * Its maybe a good idea to refactor the interaction method
 * and move the interaction handling to the objects
 *
 * @param key
 * @constructor
 */
function DeleteBar(key) {
  m$.bars.splice(key, 1);
}

function selectBar(key) {
  m$.selectedBar  = key;
}

function interaction() {
  var initialOffset = 12;

  /**
   * Event Handlers
   */
  stage.on("stagemousedown", function (evt) {

    var detectIndex = false;
    var isItem = false;
    var editMode = m$.settings.editMode2

    isItem = detectItem(evt.stageX, evt.stageY);

    if (isItem) {
      m$.settings.editMode2 = 'move'
      initmove(evt.stageX, evt.stageY);
    } else {
      switch (editMode) {
        case 'draw':
          addItem(evt.stageX, evt.stageY);
          break;
        case 'delete':
          deleteItem(evt.StageX, evt.stageY);
          break;
        case 'move':
          initmove(evt.stageX, evt.stageY);
          break;
      }
    }
    switch (m$.actItem) {
      case 'bar':
        break;
    }
  });

  stage.on("stagemouseup", function (evt) {
    m$.actItem = false;
    m$.actItemType = false;
    m$.actItemOffset = 0;
    m$.settings.editMode2 = 'draw'
  });

  stage.on("stagemousemove", function (evt) {
    if (m$.actItemType == 'bar' && m$.settings.editMode2 == 'draw') {
      var width = evt.stageX - m$.actItem.x;
      var height = evt.stageY - m$.actItem.y;

      if (width < 10) {
        width = 10
      }
      if (height < 10) {
        height = 10
      }

      m$.actItem.width = width;
      m$.actItem.height = height;
    }
    if (m$.settings.editMode2 == 'move') {
      moveItem(evt.stageX, evt.stageY);
    }
  });

  /**
   *
   * Actions
   *
   */
  function initmove(x, y) {
    if (m$.actItemType == 'bar') {
      m$.actItemOffset = x - m$.actItem.x
    }
  }

  function moveItem(x, y) {
    m$.actItem.x = x - m$.actItemOffset;
    m$.actItem.y = y;
  }

  /**
   * Checks if the given coordinate is
   * within an item on the canvas
   *
   * @param int x
   * @param int y
   * @returns object | bool
   */
  function detectItemIndex(items, x, y) {
    var i = 0;
    for (i = 0; i < items.length; i++) {
      var item = items[i];

      if (((x >= item.x) && (x <= (item.x + item.width))) &&
        ((y >= item.y) && (y <= item.y + item.height))
      ) {
        return i;
      }
    }
    return false;
  }


  /**
   * Sets the global actItemType and actItemIndex
   *
   * @param integer x
   * @param integer y
   * @returns {Boolean}
   */
  function detectItem(x, y) {
    var detectIndex = false;

    m$.actItem = false;
    m$.acItemType = false;
    m$.acItemIndex = false;

    detectIndex = detectItemIndex(m$.bars, x, y);
    if (detectIndex !== false) {
      m$.actItem = m$.bars[detectIndex];
      m$.actItemType = 'bar';
      m$.actItemIndex = detectIndex;
      return true;
    }
    return false;
  }

  function addItem(x, y) {
    if (m$.actItem === false) {
      switch (m$.settings.edit.tool) {
        case 'bar':
          m$.bars.push(new Bar(x, y, 5));
          m$.actItem = m$.bars[m$.bars.length - 1];
          m$.actItemType = 'bar';
          break;
      }
    }
  }

  function deleteItem(x, y) {
    if (m$.actItem !== false) {
      switch (m$.actItemType) {
        case 'bar':
          m$.bars.splice(m$.actItemIndex, 1);
          break;
      }
    }
  }
}