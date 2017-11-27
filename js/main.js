$(function(argument) {

  var started = false;

  var count = 30;
  var creationInterval = 1000; // millisecond

  var mothCreator;

  // Making a copy as there is no time to refactor.
  // Consolidate from moth and moth-animator files and put in common place.
  var updateCounts = function() {
    $('.light-moth-count').text($('.light-moth').length);
    $('.dark-moth-count').text($('.dark-moth').length);
  }


  $('#start-btn').on('click', function() {
    updateCounts();

    mothCreator = window.setInterval(function() {
      var moth = new Moth();
      moth.init();
    }, creationInterval);
  });

  $('#stop-btn').on('click', function() {
    window.clearInterval(mothCreator);
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

});
