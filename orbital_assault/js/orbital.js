$(document).ready(function() {

  // For IE6
  try {
    document.execCommand("BackgroundImageCache", false, true);
  } catch(err) {};

  var PLAYER = 1,
      LASER = 2,
      ALIEN = 4,
      ALIEN_BOMB = 8,
      SHIELD = 16,
      SAUCER = 32,
      TOP_OF_SCREEN = 64,
      TANK_Y = 352 - 16,
      SHIELD_Y = TANK_Y - 56,
      SCREEN_WIDTH = 480,
      SCREEN_HEIGHT = 384,
      ALIEN_COLUMNS = 11,
      ALIEN_ROWS = 5,
      SYS_porcess,
      SYS_collisionManager,
      SYS_timeInfo,
      SYS_spriteParams= {
        width: 32,
        height: 32,
        imagesWidth: 256,
        images: '/images/invaders.png',
        $drawTarget: $('#draw-target')
      }

  var processor = function() {
    var processList = [],
        addedItems = [];
        return {
          add: function(process) {
            addedItems.push(process);
          },
        process: function() {
          var newProcessList = [],
          len = processList.length;
          for (var i=0; i < len; i++) {
            if (!processList[i].removed) {
              processList[i].move();
              newProcessList.push(processList[i]);
            }
          }
          processList = newProcessList.concat(addedItems);
          addedItems = [];
      }
    };
  };

  var collisionManager = function() {
    var listIndex = 0,
    grid = [],
    checkLIstIndex = 0,
    checkList = {},
    gridWidth = 15,
    gridHeight = 12;

    for (var i = 0; i < gridWidth * gridHeight; i++) {
      grid.push({});
    }

    var getGridList = function(x, y) {
      var idx = (Math.floor(y/32) * gridWidth) + Math.floor(x / 32);
      if (grid[idx] === undefined) {
        return;
      }
      return grid[idx];
    };

  };

  var DHTMLSprite = function(params) {

  };

  var timeInfo = function(goalFPS) {

  };

  var keys = function() {
    var keyMap = {
      '90': 'left',
      '88': 'right',
      '77': 'fire'
    },
    kInfo = {
      'left': 0,
      'right': 0,
      'fire': 0
    },
    key;

    $(document).bind('keydown keyup', function(event) {
      key = '' + event.which;
      if (keyMap[key] !== undefined) {
        kInfo[keyMap[key]] = event.type === 'keydown' ? 1: 0;
        return false;
      }
    });
    return kInfo;
  }();

  var animEffect = function(x, y, imageList, timeout) {

  };

  var alien = function(x, y, frame, points, hitCallback) {

  };

  var aliensManager = function(gameCallback, startY) {

  };

  var laser = function(x, y, callback) {

  };

  var alienBomb = function(x, y, removedCallback) {

  };

  var tank = function(gameCallback) {

  };

  var shielf = function(x, y) {

  };

  var saucer = function(gameCallback) {

  };

  var game = function() {

  }();

});
