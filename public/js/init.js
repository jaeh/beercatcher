"use strict";

jQuery(function($) {
  var scene = Scene($);

  Pickups($, scene);
  Enemies($, scene);
  scene.player = Player($, scene);
});
