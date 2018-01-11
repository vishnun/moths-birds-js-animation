var MothApp = function(beforeIndustrialRevolution) {
  beforeIndustrialRevolution = beforeIndustrialRevolution == undefined ? True : beforeIndustrialRevolution;


  function resetMoths() {
    $('.moth').remove();
    updateCounts();
  }

  function reset() {
    window.allMothTimeLines = [];
    window.paused = false;
    window.timeInSeconds = 0;
    updateTime(0);
    resetMoths();
  }

  function init() {
    var creationInterval = 1000; // millisecond
    var moth;
    var mothCreator;
    var timer;

    reset();

    $('#exit-btn').on('click', function() {
      $('.moth-simulator').addClass('hidden');
      reset();
    });

    $('#start-btn').on('click', function() {
      updateCounts();

      timer = window.setInterval(function() {
        updateTime(window.timeInSeconds += 1);
      }, 1000);

      mothCreator = window.setInterval(function() {
        moth = new Moth();
        moth.init();
        if (window.paused) {
          moth.playAnime();
          window.paused = false;
        }
      }, creationInterval);
    });

    $('#stop-btn').on('click', function() {
      window.clearInterval(mothCreator);
      window.clearInterval(timer);
      moth.pauseAnime();
      window.paused = true;
    });

    $('.container').mousemove(function(e) {
      $('.bird').removeClass('hidden');
      var y = e.pageY;
      var x = e.pageX;
      $('.bird').css({
        'top': y - 10
      });
      $('.bird').css({
        'left': x - 15
      });
    }).mouseout(function(e) {
      $('.bird').addClass('hidden');
    });
  }

  return {
    init: init,
    reset: reset
  };

}
