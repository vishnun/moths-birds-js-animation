var Moth = function(canvas) {
  var sides = ['Top', 'Right', 'Left', 'Bottom'];
  var self = this;
  var entrySide = sides[Math.floor(Math.random() * sides.length)];
  var canvas = canvas || new Canvas();
  var target = 'moth-' + Math.floor(Math.random() * 50000);
  var $el;

  var flipClass = entrySide == 'Top' ? 'flip-vertical' : '';

  if (Math.random() <= 0.5) {
    $el = $("<div class='dark-moth " + target + " " + flipClass + " hide'></div>");
  } else {
    $el = $("<div class='light-moth " + target + " " + flipClass + " hide'></div>");
  }

  $el.target = target;
  canvas.addMoth($el);

  $el.on('click', function() {
    updateCounts();
    $(this).remove();
  });

  var animator = new MothAnimator($el, entrySide, canvas);

  var enter = function() {
    animator.setInitialPosition($el);
    animator.next();
  };

  var pause = function() {
    animator.pause();
  };

  var play = function() {
    animator.play();
  };

  return {
    init: function() {
      enter();
    },
    pauseAnime: function() {
      pause();
    },
    playAnime: function() {
      play();
    }
  };
};
