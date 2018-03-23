function updateCounts() {
  var totalMothCount = $('.moth').length;
  var lightMothPercentage = 0, darkMothPercentage = 0;

  if (totalMothCount > 0) {
    lightMothPercentage = 100 * $('.light-moth').length / totalMothCount;
    darkMothPercentage = 100 * $('.dark-moth').length / totalMothCount;
  }

  $('.light-moth-count').text(lightMothPercentage.toFixed(0));
  $('.dark-moth-count').text(darkMothPercentage.toFixed(0));

  window.plotter.update({'lightMoths': lightMothPercentage.toFixed(0), 'darkMoths': darkMothPercentage.toFixed(0)});
}

function updateTime(ageInSeconds) {
  var age = ageInSeconds / 6.0;
  $('.age').text(age.toFixed(1));
}

// Should go in Util.js
function arrayRemove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

function getMothCallbacks() {
  var callbacks = {
    runCallback: function (mothEl) {
      var birds = $('.birdie').not('.hide');
      var $moth = $("." + mothEl);
      if ($moth.length == 0 || !shouldMothBeEaten($moth)) {
        return;
      }
      var rect1 = $moth[0].getBoundingClientRect();
      birds.toArray().forEach(function (bird) {
        var rect2 = bird.getBoundingClientRect();
        var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        if (overlap) {
          $moth.toggle({
            effect: 'scale',
            complete: function () {
              $moth.remove();
            }
          });
        }
      });
    }
  };
  return callbacks;
}

function mothEatingThreshold() {

  var irRangeVal = $('#ir-range').val();

  if (irRangeVal < 0.3) {
    return 0.1;
  }
  else if (irRangeVal > 0.7) {
    return 0.9;
  }

  return irRangeVal;

}

function shouldMothBeEaten(moth) {
  var prob = Math.random();
  var threshold = mothEatingThreshold();

  var shouldEatIt = false;

  if (prob >= threshold && $(moth).hasClass('dark-moth')) {
    shouldEatIt = true;
  }
  if (prob < threshold && $(moth).hasClass('light-moth')) {
    shouldEatIt = true;
  }

  return shouldEatIt;
}
function getBirdCallbacks() {
  var callbacks = {
    runCallback: function (birdEl) {
      var moths = $('.moth').not('.hide');
      var bird = $("." + birdEl);
      if (bird.length == 0) {
        return;
      }
      var rect1 = bird[0].getBoundingClientRect();
      moths.toArray().forEach(function (moth) {
        var rect2 = moth.getBoundingClientRect();
        var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        var shouldEatIt = shouldMothBeEaten(moth);

        if (overlap && shouldEatIt) {
          $(moth).toggle({
            effect: 'scale',
            complete: function () {
              $(moth).remove();
            }
          });
        }
      });
    }
  };
  return callbacks;
}