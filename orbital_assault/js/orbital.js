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

  var shield = function(x, y) {

  };

  var saucer = function(gameCallback) {

  };

  var game = function() {
    var time,
        aliens,
        gameState = 'titleScreen',
        aliensStartY,
        lives,
        score = 0,
        highScore = 0,
        extraLifeScore = 0,
        saucerTimeout = 0,
        newTankTimeout,
        newWaveTimeout,
        gameOverFlag = false,
        startText =
          '<div class="message">' +
          '<p>ORBIT ASSAULT</p>' +
          '<p>Press FIRE to Start</p>' +
          '<p>Z = LEFT</p>' +
          '<p>X = RIGHT</p>' +
          '<p>M = FIRE</p>' +
          '<p>EXTRA TANK EVERY 5000 POINTS</p>' +
          '</div>',
        initShields = function() {
          for (var x = 0; x < 4; x++) {
            shield((SCREEN_WIDTH/2) - 192 + 12 + (x * 96), SHIELD_Y);
          }
        },
        updateScores = function() {
          if (score - extraLifeScore >= 5000) {
            extraLifeScore += 5000;
            lives++;
          }
          if(!$('#score').length) {
            $("#draw-target").append('<div id="score"></div>' + '<div id="lives"></div><div id="highScore"></div>');
          }
          if (score > highScore) {
            highScore = score;
          }
          $('#score').text('SCORE: ' + score);
          $('#highScore').text('HIGH: ' + highScore);
          $('#lives').text('LIVES: ' + lives);
        },

        newSaucer = function() {
          clearTimeout(saucerTimeout);
          saucerTimeout = setTimeout(function() {
            saucer(gameCallback);
            newSaucer();
          }, (Math.random() * 5000) + 15000);
        },

        init = function() {
          $("#draw-target").children().remove();
          SYS_process = processor();
          SYS_collisionManager = collisionManager();
          aliens = aliensManager(gameCallback, aliensStartY);
          setTimeout(function() {
            tank(gameCallback);
          }, 2000);
          initShields();
          newSaucer();
          updateScores();
        },
        gameOver = function() {
          gameOverFlag = true;
          clearTimeout(newTankTimeout);
          clearTimeout(newWaveTimeout);
          clearTimeout(saucerTimeout);
          setTimeout(function() {
            $("#draw-target").children().remove();
            $("#draw-target").append('<div class="message">' + '<p>*** GAME OVER ***</p></div>' + startText);
            gameState = 'titleScreen';
          }, 2000);
        },

        gameCallback = function(messageObj) {
          if (gameOverFlag) {
            return;
          }
          switch(messageObj.message) {
            case 'alienKilled':
              score += messageObj.score;
              updateScores();
              break;
            case 'saucerHit':
              var pts = Math.floor((Math.random() * 3) + 1);
              score += pts * 50;
              updateScores();
              animEffect(messageObj.x, messageObj.y, [pts + 20], 500, null);
              break;
            case 'playerKilled':
              aliens.pauseAliens(2500);
              lives--;
              updateScores();
              if (!lives) {
                gameOver();
              } else {
                newTankTimeout = setTimeout(function() {
                  tank(gameCallback);
                }, 2000);
              }
              break;
            case 'allAliensKilled':
              if (aliensStartY < 160) {
                aliensStartY += 32;
              }
              newWaveTimeout = setTimeout(function() {
                init();
              }, 2000);
              break;
            case 'aliensAtBottom':
              gameOver();
              break;
          }
        },

        gameLoop = function() {
          switch(gameState) {
            case 'playing':
              SYS_timeInfo = time.getInfo();
              SYS_process.process();
              SYS_collisionManager.checkCollisions();
              break;

            case 'titleScreen':
              if (keys.fire) {
                gameOverFlag = false;
                time = timeInfo(60);
                keys.fire = 0;
                lives = 3;
                score = 0;
                extraLifeScore = 0;
                aliensStartY = 64;
                gameState = 'playing';
                init();
              }
          }
          setTimeout(gameLoop, 15);
        }();

        $("#draw-target").append(startText);
        gameLoop();

    }();

});
