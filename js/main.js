$(function(argument) {
  var creationInterval = 1000; // millisecond

  var moth;
  var mothCreator;

  window.allMothTimeLines = [];
  window.paused = false;

  $('#start-btn').on('click', function() {
    updateCounts();
    mothCreator = window.setInterval(function() {
      moth = new Moth();
      moth.init();
      if(window.paused) {
        moth.playAnime();
        window.paused = false;
      }
    }, creationInterval);
  });

  $('#stop-btn').on('click', function() {
    window.clearInterval(mothCreator);
    moth.pauseAnime();
    window.paused = true;
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
