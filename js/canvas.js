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
      'top': y - 20
    });
    $bird.css({
      'left': x - 77
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
