var Moth = function (canvas) {
  var sides = ['Top', 'Right', 'Left', 'Bottom'];
  var self = this;
  var entrySide = sides[Math.floor(Math.random() * sides.length)];
  var canvas = canvas || new Canvas();
  var target = 'moth-' + Math.floor(Math.random() * 50000);
  var $el;

  var flipClass = entrySide == 'Top' ? 'flip-vertical' : '';

  var probabilityForDarkMoth = isAfterIR() ? 0.6 : 0.4;

  if (Math.random() <= probabilityForDarkMoth) {
    $el = $("<div class='moth dark-moth " + target + " " + flipClass + " hide'></div>");
  } else {
    $el = $("<div class='moth light-moth " + target + " " + flipClass + " hide'></div>");
  }

  $el.target = target;
  canvas.addObj($el);

  $el.on('click', function () {
    updateCounts();
    $(this).remove();
  });


  var animator = new Animator($el, entrySide, canvas, getMothCallbacks());

  var enter = function () {
    animator.setInitialPosition($el);
    animator.next();
  };

  var pause = function () {
    animator.pause();
  };

  var play = function () {
    animator.play();
  };

  return {
    init: function () {
      enter();
    },
    pauseAnime: function () {
      pause();
    },
    playAnime: function () {
      play();
    }
  };
};
