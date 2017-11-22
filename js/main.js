$(function(argument) {
  var count = 30;
  var creationInterval = 2000; // millisecond

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
