var MothApp = function (beforeIndustrialRevolution) {
  beforeIndustrialRevolution = beforeIndustrialRevolution == undefined ? true : beforeIndustrialRevolution;


  function resetMoths() {
    $('.moth').remove();
    updateCounts();
  }

  function reset() {
    window.allObjTimeLines = [];
    window.paused = false;
    window.timeInSeconds = 0;
    updateTime(0);
    resetMoths();
  }

  function init() {
    var creationInterval = 200; // millisecond
    var moth, bird;
    var mothCreator, birdCreator;
    var timer;
    var $bird = $('.bird');

    // Used in update counts to update the chart.
    window.plotter = new ChartPlotter();

    reset();


    $('#ir-range').on('input', function () {
      var rangeEl = $(this);
      $('.after-ir-bg').css('opacity', rangeEl.val());
    });

    $('#exit-btn').on('click', function () {
      $('.moth-simulator').addClass('hidden');
      $('.home').show();
      reset();
    });

    $('#start-btn').on('click', function () {
      updateCounts();
      window.paused = false;

      timer = window.setInterval(function () {
        updateTime(window.timeInSeconds += 1);
      }, 1000);

      mothCreator = window.setInterval(function () {
        moth = new Moth();
        moth.init();
        if (!window.paused) {
          moth.playAnime();
        }
      }, creationInterval);

      birdCreator = window.setInterval(function () {
        bird = new Bird();
        bird.init();
        if (!window.paused) {
          bird.playAnime();
        }
      }, creationInterval * 8);

    });

    $('#stop-btn').on('click', function () {
      window.clearInterval(mothCreator);
      window.clearInterval(birdCreator);
      window.clearInterval(timer);
      moth.pauseAnime();
      window.paused = true;
    });

    $('.moth-simulator .container').mousemove(function (e) {
      $bird.removeClass('hidden');
      var y = e.pageY;
      var x = e.pageX;
      $bird.css({
        'top': y - 20
      });
      $bird.css({
        'left': x - 75
      });
    }).mouseout(function (e) {
      $bird.addClass('hidden');
    });
  }

  return {
    init: init,
    reset: reset
  };

};
