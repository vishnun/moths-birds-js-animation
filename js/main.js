$(function(argument) {

  $('#before-IR-btn').on('click', function() {
    var beforeIndustrialRevolution = true;
    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
  });

  $('#before-IR-btn').on('click', function() {
    var beforeIndustrialRevolution = false;
    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
  });

});
