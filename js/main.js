var Canvas = function(height, width) {
  var self = this;
  self.height = height || 1000;
  self.width = width || 1000;

  var $el = $('#moth-canvas');
  var $bird = $('.bird');

  $el.mousemove(function(e) {
    var y = e.pageY;
    var x = e.pageX;
    $bird.css({
      'top': y - 10
    });
    $bird.css({
      'left': x - 15
    });
  });

  return {
    addMoth: function($moth) {
      $el.append($moth);
    },
    getHeight: function() {
      return self.height;
    },
    getWidth: function() {
      return self.width;
    }
  };
};

var MothAnimator = function($moth, entrySide, canvas) {
  var entrySide = entrySide || 'Top';
  var canvas = canvas || new Canvas();
  var loop = false;
  var easing = 'linear';
  var direction = 'normal';

  anime.speed = 2;

  var xPosValid = function(xPos) {
    return xPos >= 0 && xPos <= canvas.getWidth();
  };

  var yPosValid = function(yPos) {
    return yPos >= 0 && yPos <= canvas.getHeight();
  };

  var addFinishing = function($moth, mothTimeLine) {
    anime.remove($moth.target);
  };

  var nextPathForTopEntry = function() {
    console.log("next path for Top");
    var mothTimeLine = anime.timeline({
      loop,
      direction
    });
    var xPos = $moth.xPos;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');

    while (xPosValid(xPos) && yPos <= canvas.getHeight()) {
      yPos = yPos + canvas.getHeight() / 4;
      mothTimeLine.add({
        delay: 3000,
        targets: "." + $moth.target,
        translateY: yPos,
        translateX: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        easing
      });
    }
    addFinishing($moth, mothTimeLine);
  };

  var nextPathForRightEntry = function() {
    console.log("next path for Right");
    var mothTimeLine = anime.timeline({
      loop,
      direction
    });
    var xPos = 0;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');
    while (yPosValid(yPos) && xPos >= -canvas.getWidth()) {

      xPos = xPos - canvas.getWidth() / 4;
      mothTimeLine.add({
        delay: 3000,
        targets: "." + $moth.target,
        translateY: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        translateX: xPos,
        easing
      });
    }
    addFinishing($moth, mothTimeLine);
  };

  var nextPathForBottomEntry = function() {
    console.log("next path for Bottom");
    var mothTimeLine = anime.timeline({
      loop,
      direction
    });
    var xPos = $moth.xPos;
    var yPos = 0;
    $moth.removeClass('hide');
    while (yPosValid(xPos) && yPos >= -canvas.getWidth()) {

      yPos = yPos - canvas.getWidth() / 4;
      mothTimeLine.add({
        delay: 3000,
        targets: "." + $moth.target,
        translateY: yPos,
        translateX: anime.random(-canvas.getHeight() / 3, canvas.getHeight() / 3),
        easing
      });
    }
    addFinishing($moth, mothTimeLine);
  };

  var nextPathForLeftEntry = function() {
    console.log("next path for Left");
    var mothTimeLine = anime.timeline({
      loop,
      direction
    });
    var xPos = $moth.xPos;
    var yPos = $moth.yPos;
    $moth.removeClass('hide');

    while (xPosValid(yPos) && xPos <= canvas.getHeight()) {
      xPos = xPos + canvas.getWidth() / 4;
      mothTimeLine.add({
        delay: 3000,
        targets: "." + $moth.target,
        translateY: anime.random(-canvas.getWidth() / 3, canvas.getWidth() / 3),
        translateX: xPos,
        easing
      });
    }
    addFinishing($moth, mothTimeLine);
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
    }
  };
};

var Moth = function(canvas) {
  var sides = ['Top', 'Right', 'Left', 'Bottom'];
  var self = this;
  var entrySide = sides[Math.floor(Math.random() * sides.length)];
  var canvas = canvas || new Canvas();
  var target = 'moth-' + Math.floor(Math.random() * 50000);
  var $el = $("<div class='moth " + target + " hide'></div>");
  $el.target = target;
  canvas.addMoth($el);


  $el.on('click', function() {
    $(this).remove();
  });

  var animator = new MothAnimator($el, entrySide, canvas);

  var enter = function() {
    animator.setInitialPosition($el);
    animator.next();
  }

  return {
    init: function() {
      enter();
    }
  };
};

$(function(argument) {
  var count = 3;
  var creationInterval = 1000; // millisecond

  var mothCreator = window.setInterval(function() {
    var moth = new Moth();
    moth.init();
  }, creationInterval);

  setTimeout(function() {
    window.clearInterval(mothCreator);
  }, count * creationInterval);

  $('.container').mousemove(function(e) {
    var y = e.pageY;
    var x = e.pageX;
    $('.bird').css({
      'top': y - 10
    });
    $('.bird').css({
      'left': x - 15
    });
  });

});
