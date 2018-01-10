var MothAnimator = function($moth, entrySide, canvas) {
  var entrySide = entrySide || 'Top';
  var canvas = canvas || new Canvas();
  var loop = false;
  var easing = 'linear';
  var direction = 'normal';
  var lifeTimeInSec = 20000;

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

  var addFinishing = function($moth, mothTimeLine) {
    mothTimeLine.add({
      complete: function(animation) {
        // order of completion will be same as order in which they were created. So this should work. 
        allMothTimeLines.pop();
        setTimeout(function () {
          $moth.remove();
        }, lifeTimeInSec);
        updateCounts();
      }
    })
  };

  var nextPathForTopEntry = function() {
    console.log("next path for Top");
    var mothTimeLine = anime.timeline({
      targets: "." + $moth.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = $moth.xPos;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');

    while (xPosValid(xPos) && yPos <= canvas.getHeight()) {
      yPos = yPos + canvas.getHeight() / 4;
      mothTimeLine.add({
        translateY: yPos,
        translateX: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($moth, mothTimeLine);
    window.allMothTimeLines.push(mothTimeLine);
  };

  var nextPathForRightEntry = function() {
    console.log("next path for Right");
    var mothTimeLine = anime.timeline({
      targets: "." + $moth.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = 0;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');
    while (yPosValid(yPos) && xPos >= -canvas.getWidth()) {
      xPos = xPos - canvas.getWidth() / 4;
      mothTimeLine.add({
        translateY: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        translateX: xPos,
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($moth, mothTimeLine);
    window.allMothTimeLines.push(mothTimeLine);
  };

  var nextPathForBottomEntry = function() {
    console.log("next path for Bottom");
    var mothTimeLine = anime.timeline({
      targets: "." + $moth.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = $moth.xPos;
    var yPos = 0;
    $moth.removeClass('hide');
    while (yPosValid(xPos) && yPos >= -canvas.getWidth()) {

      yPos = yPos - canvas.getWidth() / 4;
      mothTimeLine.add({
        translateY: yPos,
        translateX: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($moth, mothTimeLine);
    window.allMothTimeLines.push(mothTimeLine);
  };

  var nextPathForLeftEntry = function() {
    console.log("next path for Left");
    var mothTimeLine = anime.timeline({
      targets: "." + $moth.target,
      loop: loop,
      direction: direction,
      easing: easing,
      delay: 3000
    });
    var xPos = $moth.xPos;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');

    while (xPosValid(yPos) && xPos <= canvas.getHeight()) {
      xPos = xPos + canvas.getWidth() / 4;
      mothTimeLine.add({
        translateY: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        translateX: xPos,
        complete: function(animation) {
          updateCounts();
        }
      });
    }
    addFinishing($moth, mothTimeLine);
    window.allMothTimeLines.push(mothTimeLine);
  };

  var NextPathMapping = {
    'Top': nextPathForTopEntry,
    'Right': nextPathForRightEntry,
    'Bottom': nextPathForBottomEntry,
    'Left': nextPathForLeftEntry
  };

  var setInitialPositionFor = function($moth) {
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

    $moth.xPos = xPos;
    $moth.yPos = yPos;

    $moth.css({
      'left': xPos
    });

    $moth.css({
      'top': yPos
    });
  };

  return {
    setInitialPosition: function($moth) {
      setInitialPositionFor($moth);
    },
    next: function() {
      NextPathMapping[entrySide].call();
    },
    pause: function() {
      window.allMothTimeLines.forEach(function(mothTimeLine) {
        if(mothTimeLine) {
          mothTimeLine.pause()
        }
      });
    },

    play: function() {
      window.allMothTimeLines.forEach(function(mothTimeLine) {
        if(mothTimeLine) mothTimeLine.play();
      });
    }
  };
};
