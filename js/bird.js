var Bird = function(canvas) {
  var sides = ['Top', 'Right', 'Left', 'Bottom'];
  var self = this;
  var entrySide = sides[Math.floor(Math.random() * sides.length)];
  var canvas = canvas || new Canvas();
  var target = 'bird-' + Math.floor(Math.random() * 50000);
  var $el;

  var flipClass = entrySide == 'Top' ? 'flip-vertical' : '';

  $el = $("<div class='birdie " + target + " " + flipClass + " hide'></div>");

  $el.target = target;
  canvas.addObj($el);

  var animator = new Animator($el, entrySide, canvas, getBirdCallbacks());

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
