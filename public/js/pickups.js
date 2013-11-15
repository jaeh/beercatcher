"use strict";


function Pickups($, scene) {
  var pickupContainer = $('#pickup.container')
    , dims = {
        height: 23
      , width: 20
    }
    , bounds = scene.boundary;

  function spawnPickups(num) {

    for (var i = 0; i < num; i++) {

      var pos = {
            left: Math.random() * (bounds.right - bounds.left - dims.width) + bounds.left
          , top: Math.random() * (bounds.bottom - bounds.top - dims.height) + bounds.top
        }
        , id = 'pUp-' + scene.colliderId
        , pickupStr = '<div id="pUp-' + scene.colliderId + '" class="pickup" style="left:' + pos.left + 'px;top:' + pos.top + 'px;"></div>';

      pickupContainer.append(pickupStr);

      scene.colliders[id] = {id: id, collide: collide, position: {left: pos.left, top: pos.top}};

      scene.colliderId++;
    }
  }

  function collide(scene, pUp) {
    if (!pUp.collided) {
      pUp.collided = true;
      scene.score += 1;
      spawnPickups(1);
      $('#' + pUp.id).remove();
      delete scene.colliders[pUp.id];
    }
  }

  spawnPickups(1);
}
