function updateCounts() {
  $('.light-moth-count').text($('.light-moth').length);
  $('.dark-moth-count').text($('.dark-moth').length);
}

// Should go in Util.js
function arrayRemove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
