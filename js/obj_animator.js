var Animator = function($object, entrySide, canvas, callbacks) {
  var entrySide = entrySide || 'Top';
  var canvas = canvas || new Canvas();
  var loop = false;
  var easing = 'linear';
  var direction = 'normal';
  var lifeTimeInSec = 2000;

  anime.speed = 1;

  var xPosValid = function(xPos) {
    return xPos >= 0 && xPos <= canvas.getWidth();
  };

  var yPosValid = function(yPos) {
    return yPos >= 0 && yPos <= canvas.getHeight();
  };

  var removeTarget = function (target) {
    target.remove();
  };

  var addFinishing = function($obj, objTimeLine) {
    objTimeLine.add({
      complete: function(animation) {
        // order of completion will be same as order in which they were created. So this should work.
        allObjTimeLines.pop();
        setTimeout(function () {
          $obj.remove();
        }, lifeTimeInSec);
        updateCounts();
      }
    })
  };

  var nextPathForTopEntry = function() {
    // console.log("next path for Top");
    var objTimeLine = anime.timeline({
      targets: "." + $object.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000,
      run: function(anim) {
        if(callbacks && callbacks.runCallback){
          callbacks.runCallback($object.target, anim);
        }
      }
    });
    var xPos = $object.xPos;
    var yPos = $object.yPos;
    $object.removeClass('hide');

    while (xPosValid(xPos) && yPos <= canvas.getHeight()) {
      yPos = yPos + canvas.getHeight() / 4;
      objTimeLine.add({
        translateY: yPos,
        translateX: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($object, objTimeLine);
    window.allObjTimeLines.push(objTimeLine);
  };

  var nextPathForRightEntry = function() {
    // console.log("next path for Right");
    var objTimeLine = anime.timeline({
      targets: "." + $object.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = 0;
    var yPos = $object.yPos;
    $object.removeClass('hide');
    while (yPosValid(yPos) && xPos >= -canvas.getWidth()) {
      xPos = xPos - canvas.getWidth() / 4;
      objTimeLine.add({
        translateY: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        translateX: xPos,
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($object, objTimeLine);
    window.allObjTimeLines.push(objTimeLine);
  };

  var nextPathForBottomEntry = function() {
    // console.log("next path for Bottom");
    var objTimeLine = anime.timeline({
      targets: "." + $object.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = $object.xPos;
    var yPos = 0;
    $object.removeClass('hide');
    while (yPosValid(xPos) && yPos >= -canvas.getWidth()) {

      yPos = yPos - canvas.getWidth() / 4;
      objTimeLine.add({
        translateY: yPos,
        translateX: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($object, objTimeLine);
    window.allObjTimeLines.push(objTimeLine);
  };

  var nextPathForLeftEntry = function() {
    // console.log("next path for Left");
    var objTimeLine = anime.timeline({
      targets: "." + $object.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = $object.xPos;
    var yPos = $object.yPos;
    $object.removeClass('hide');

    while (xPosValid(yPos) && xPos <= canvas.getHeight()) {
      xPos = xPos + canvas.getWidth() / 4;
      objTimeLine.add({
        translateY: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        translateX: xPos,
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($object, objTimeLine);
    window.allObjTimeLines.push(objTimeLine);
  };

  var NextPathMapping = {
    'Top': nextPathForTopEntry,
    'Right': nextPathForRightEntry,
    'Bottom': nextPathForBottomEntry,
    'Left': nextPathForLeftEntry
  };

  var setInitialPositionFor = function($obj) {
    var yPos = 0,
      xPos = 0;
    if (entrySide == 'Top') {
      yPos = 0;
      xPos = Math.floor(Math.random() * canvas.getWidth());
    } else if (entrySide == 'Right') {
      yPos = Math.floor(Math.random() * canvas.getHeight());
      xPos = canvas.getWidth();
    } else if (entrySide == 'Bottom') {
      yPos = canvas.getHeight();
      xPos = Math.floor(Math.random() * canvas.getWidth());
    } else if (entrySide == 'Left') {
      yPos = Math.floor(Math.random() * canvas.getHeight());
      xPos = 0;
    }

    $obj.xPos = xPos;
    $obj.yPos = yPos;

    $obj.css({
      'left': xPos
    });

    $obj.css({
      'top': yPos
    });
  };

  return {
    setInitialPosition: function($obj) {
      setInitialPositionFor($obj);
    },
    next: function() {
      NextPathMapping[entrySide].call();
    },
    pause: function() {
      window.allObjTimeLines.forEach(function(objTimeLine) {
        if(objTimeLine) {
          objTimeLine.pause()
        }
      });
    },

    play: function() {
      window.allObjTimeLines.forEach(function(objTimeLine) {
        if(objTimeLine) objTimeLine.play();
      });
    }
  };
};
