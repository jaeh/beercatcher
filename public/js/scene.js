"use strict";

function Scene($) {
  var gameContainer = $('#game')
    , score = 0
    , offset = gameContainer.offset()
    , scene = {
        debug: true
      , dimensions: {
          height: $('#game.container').outerHeight()
        , width: $('#game.container').outerWidth()
      }
      , level: 0
      , boundary: {
          top: offset.top
        , left: offset.left
        , right: offset.left + gameContainer.width()
        , bottom: offset.top + gameContainer.height()
      }
      , colliders: []
      , pickups: []
    };

  console.log('Scene init.');

  if (scene.debug) {
    $('body').append(
      '<div class="dot" style="position:absolute;left: ' + scene.boundary.left + 'px; top:' + scene.boundary.top + 'px"></div>'
    + '<div class="dot" style="position:absolute;left: ' + scene.boundary.left + 'px; top:' + (scene.boundary.bottom - 5) + 'px"></div>'
    + '<div class="dot" style="position:absolute;left: ' + (scene.boundary.right - 5) + 'px; top:' + scene.boundary.top + 'px"></div>'
    + '<div class="dot" style="position:absolute;left: ' + (scene.boundary.right - 5) + 'px; top:' + (scene.boundary.bottom - 5) + 'px"></div>'
    );
    $('#player.container').append('<div id="player-debug"></div>');
  }

  return scene;
}
