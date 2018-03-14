$(function (argument) {
  var $body = $('body');
  var beforeIndustrialRevolution;

  function initiateMothApp() {
    $body.removeClass('after-ir');
    $body.addClass('before-ir');

    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
    $('.home').hide();
  }

  $('#before-IR-btn').on('click', function () {
    beforeIndustrialRevolution = true;
    initiateMothApp();
  });

  $('#after-IR-btn').on('click', function () {
    beforeIndustrialRevolution = false;
    initiateMothApp();
  });

});
