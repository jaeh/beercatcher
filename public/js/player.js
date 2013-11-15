"use strict";

function Player($, scene) {
  var playerSprite = $('#player.container .sprite')
    , playerContainer = $('#player.container')
    , animFrame = 0
    , frameSize = { x: 48}
    , collOffset = {x: 24, y: 30}
    , numFrames = 3
    , xpos, ypos
    , paused = false
    , walkSpeed = 3
    , keys = {
        up: 87
      , left: 65
      , right: 68
      , down: 83
      , pause: 80
    }
    , spriteYOffsets = {
        up: 18
      , left: 210
      , right: 80
      , down: 144
    }
    , walkDir = false
    , keysPressed = {
        up: false
      , left: false
      , right: false
      , down: false
      , pause: false
    };

  $('body').on('keydown', function (evt) {
    var eventKey = evt.which;

    if (eventKey === keys.pause) {
      paused = !paused;
      return;
    }

    for (var k in keys) {
      if (keys[k] === evt.which) {
        keysPressed[k] = true;
      }
    }
  });

  $('body').on('keyup', function (evt) {
    var eventKey = evt.which;
    for (var k in keys) {
      if (keys[k] === evt.which) {
        keysPressed[k] = false;
      }
    }
  });

  function collisions() {
    var playerPos = playerContainer.position()
      , colliders = []
      , playerCollider = {
          top: playerPos.top + collOffset.y
        , right: playerPos.left - collOffset.x
        , bottom: playerPos.top - collOffset.y
        , left: playerPos.left + collOffset.x
        , 
      };

    if (scene.debug) {
      var pl = playerCollider
        , debugDiv = $('#player-debug')
        , parentPos = $('#player.container').position();

      var css = {
        left: parseInt(playerPos.left - collOffset.x) + 'px',
        top: parseInt(playerPos.top + collOffset.y ) + 'px',
        height: parseInt(pl.top - pl.bottom) + 'px', 
        position: 'absolute'
      };

      console.log('setting css: ', css);
      $('#player-debug').css(css);
    }

    for (var pickupKey in scene.colliders) {
      var pUp = scene.colliders[pickupKey]
        , playerPos = playerContainer.position();

      if (playerPos.left + collOffset.x >= pUp.position.left) {
        if (playerPos.left - collOffset.x <= pUp.position.left) {
          if (playerPos.top + collOffset.y >= pUp.position.top) {
            if (playerPos.top - collOffset.y <= pUp.position.top) {
              console.log('player collided with ', pUp.id);
              pUp.collide(scene, pUp);
            }
          }
        }
      }
    }
  }

  function areKeysPressed() {
    for (var k in keysPressed) {
      if (keysPressed[k] === true) {
        return true;
      }
    }
    return false;
  }

  function animLoop () {
    var keyPressed = areKeysPressed();

    if (paused || !keyPressed) { return; }

    xpos -= frameSize.x;

    if (keysPressed.left) {
      ypos = spriteYOffsets.left;
    } else if (keysPressed.right) {
      ypos = spriteYOffsets.right;
    }

    if (keysPressed.up) {
      ypos = spriteYOffsets.up;
    } else if (keysPressed.down) {
      ypos = spriteYOffsets.down;
    }

    animFrame += 1;

    if (animFrame >= numFrames) {
      xpos = 0;
      animFrame = 0;
    }

    playerSprite.css({'background-position': -xpos + 'px ' + -ypos + 'px'});
  }

  function moveLoop() {
    var keyPressed = areKeysPressed()
      , spritePos = playerContainer.offset();

    if (paused || !keyPressed) { return; }

    if (keysPressed.up) {
      spritePos.top -= walkSpeed;
    } else if (keysPressed.down) {
      spritePos.top += walkSpeed;
    }

    if (keysPressed.left) {
      spritePos.left -= walkSpeed;
    } else if (keysPressed.right) {
      spritePos.left += walkSpeed;
    }

    if (spritePos.top < scene.boundary.top) {
        spritePos.top = scene.boundary.top;
    } else if (spritePos.top > scene.boundary.bottom - playerSprite.height()) {
      spritePos.top = scene.boundary.bottom - playerSprite.height();
    }

    if (spritePos.left > scene.boundary.right - playerSprite.width()) {
      spritePos.left = scene.boundary.right - playerSprite.width();
    } else if (spritePos.left < scene.boundary.left) {
      spritePos.left = scene.boundary.left;
    }
    //handle collisions with items and enemies
    collisions();

    playerContainer.css({left: spritePos.left, top: spritePos.top});
  }

  //anim loop first
  setInterval(animLoop, 1000 / 10);

  //then move the sprite
  setInterval(moveLoop, 1000 / 30);
}
