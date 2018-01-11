var MothApp = function(beforeIndustrialRevolution) {
  beforeIndustrialRevolution = beforeIndustrialRevolution == undefined ? True : beforeIndustrialRevolution;

  function init() {
    var creationInterval = 1000; // millisecond
    var moth;
    var mothCreator;
    var timer;

    window.allMothTimeLines = [];
    window.paused = false;
    window.timeInSeconds = 0;

    $('#start-btn').on('click', function() {
      updateCounts();

      timer = window.setInterval(function() {
        updateTime(window.timeInSeconds+=1);
      }, 1000);

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
      window.clearInterval(timer);
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
  }

  return {
    init: init
  };

}
