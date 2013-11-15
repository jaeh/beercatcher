"use strict";

function MoneyBags($, scene) {
  var moneyBags = []
    , pickupContainer = $('#pickup-container');

  //~ console.log('scene.boundary = ', scene.boundary);
  for (var i = 0; i < 30; i++) {

    var position = {
          left: (Math.random() * scene.boundary.right) + scene.boundary.left
        , top: (Math.random() * scene.boundary.bottom) + scene.boundary.top
      }
      , bagString = '<div class="pickup" style="left:' + left + 'px;top:' + top + 'px;"></div>';


    pickupContainer.append(bagString);
  }
  return moneyBags;
}
