var MothApp = function (beforeIndustrialRevolution) {
  beforeIndustrialRevolution = beforeIndustrialRevolution == undefined ? true : beforeIndustrialRevolution;
  var mothCreator, birdCreator;
  var timer;
  var $bird = $('.bird');
  window.creationInterval = 500; // millisecond
  window.duration = 1000;

  function setSpeedControls() {
    $('#faster').on('click', function () {
      window.duration = window.duration - 200;
      if (window.duration < 400) {
        window.duration = 400;
      }
    });

    $('#slower').on('click', function () {
      window.duration = window.duration + 200;
      if (window.duration > 4000) {
        window.duration = 4000;
      }
    });
  }

  setSpeedControls();


  function resetMoths() {
    $('.moth').remove();
    updateCounts();
  }

  function resetBirds() {
    $('.birdie').remove();
    updateCounts();
  }

  function reset() {
    window.allObjTimeLines = [];
    window.paused = true;
    window.timeInSeconds = 0;
    window.duration = 1000;

    window.clearInterval(mothCreator);
    window.clearInterval(birdCreator);
    window.clearInterval(timer);

    plotter.reset();

    updateTime(0);
    resetMoths();
    resetBirds();
  }

  function init() {

    var moth, bird;
    // Used in update counts to update the chart.
    window.plotter = new ChartPlotter();

    reset();


    $('#faster, #slower').on('click', function () {
      window.creationInterval = window.duration / 2;
    });

    $('#ir-range').on('input', function () {
      var rangeEl = $(this);
      $('.after-ir-bg').css('opacity', rangeEl.val());
    });

    $('#ir-switch').on('change', function () {
      if (isAfterIR()) {
        $('.after-ir-bg').css('opacity', 1);
      } else {
        $('.after-ir-bg').css('opacity', 0);
      }
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
      }, window.creationInterval);

      birdCreator = window.setInterval(function () {
        bird = new Bird();
        bird.init();
        if (!window.paused) {
          bird.playAnime();
        }
      }, window.creationInterval * 8);

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
