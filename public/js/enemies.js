"use strict";

function Enemies($, scene) {
  var enemyContainer = $('#enemy.container')
    , numOfEnemies = 4
    , enemyTypes = ['goblin', 'goblin']
    , enemyDimensions = {
        height: 48
      , width: 48
    }
    , quarterPos = {
        top: (scene.dimensions.height / 4) + scene.boundary.top - 24
      , left: (scene.dimensions.width / 4) + scene.boundary.left - 24
      , bottom: scene.boundary.bottom - (scene.dimensions.height / 4) - 24
      , right: scene.boundary.right - (scene.dimensions.width / 4) - 24
    };

  for (var i = 0; i < numOfEnemies; i++) {
    var pos = {
        top: quarterPos.top
      , left: quarterPos.left
    };

    if (i === 1) { 
      pos.top = quarterPos.top;
      pos.left = quarterPos.right;
    }
    if (i === 2) { 
      pos.top = quarterPos.bottom;
      pos.left = quarterPos.left;
    }
    if (i === 3) {
      pos.top = quarterPos.bottom;
      pos.left = quarterPos.right;
    }

    var enemyType = Math.floor(Math.random() * enemyTypes.length)
      , enemyCss = {left: pos.left + 'px', top: pos.top + 'px'}

      , enemyDiv = $(document.createElement('div'))
          .addClass('enemy ' + enemyTypes[enemyType])
          .css(enemyCss);

    console.log('enemyCss : ', enemyCss);

    enemyContainer.append(enemyDiv);
  }
}
