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

var MothAnimator = function(entrySide, canvas) {
  var entrySide = entrySide || 'Top';
  var canvas = canvas || new Canvas();

  var nextPathForTopEntry = function() {
    console.log("next path for top");
  };

  var nextPathForRightEntry = function() {
    console.log("next path for Right");
  };

  var nextPathForBottomEntry = function() {
    console.log("next path for Bottom");
  };

  var nextPathForLeftEntry = function() {
    console.log("next path for Left");
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
  var animator = new MothAnimator(entrySide, canvas);

  var $el = $("<div class='moth hide'></div>");

  canvas.addMoth($el);

  var enter = function() {
    animator.setInitialPosition($el);
    $el.removeClass('hide');
    animator.next();
  }

  return {
    init: function() {
      enter();
    }
  };
};


$(function(argument) {

  var $moth1 = new Moth();
  $moth1.init();

  var $moth = $('.moth');

  $moth.on('click', function() {
    $(this).remove();
  });

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


  // var loop = false;
  // var easing = 'linear';
  // var direction = 'alternate';
  //
  // anime({
  //   targets: '.moth',
  //   translateX: 470,
  //   translateY: 100,
  //   easing,
  //   loop,
  //   direction,
  //   background: [{
  //     value: '#333333'
  //   }]
  // })
  //
  // var mothTimeLine = anime.timeline({
  //   loop,
  //   direction
  // });
  //
  // mothTimeLine
  //   .add({
  //     targets: '.moth',
  //     translateY: 500,
  //     translateX: 500,
  //     easing
  //   }).add({
  //     delay: 2000,
  //     targets: '.moth',
  //     translateY: '-500',
  //     translateX: 500,
  //     easing
  //   }).add({
  //     delay: 1000,
  //     targets: '.moth',
  //     translateY: '-500',
  //     translateX: '-500',
  //     easing
  //   });


});
