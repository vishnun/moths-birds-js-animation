function updateCounts() {
  var totalMothCount = $('.moth').length;
  var lightMothPercentage = 0, darkMothPercentage = 0;

  if(totalMothCount > 0) {
    lightMothPercentage = 100 * $('.light-moth').length / totalMothCount;
    darkMothPercentage = 100 * $('.dark-moth').length / totalMothCount;
  }

  $('.light-moth-count').text(lightMothPercentage.toFixed(0));
  $('.dark-moth-count').text(darkMothPercentage.toFixed(0));
}

function updateTime(ageInSeconds) {
  var age = ageInSeconds/6.0;
  $('.age').text(age.toFixed(1));
}

// Should go in Util.js
function arrayRemove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
