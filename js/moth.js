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


  // Duplicated in moth animator. Needs refactoriing.
  var updateCounts = function() {
    $('.light-moth-count').text($('.light-moth').length);
    $('.dark-moth-count').text($('.dark-moth').length);
  }


  $el.on('click', function() {
    updateCounts();
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
