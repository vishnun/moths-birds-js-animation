$(function (argument) {
  var $body = $('body');
  var beforeIndustrialRevolution;

  function initiateMothApp() {

    if (beforeIndustrialRevolution) {
      $body.removeClass('after-ir');
      $body.addClass('before-ir');
    } else {
      $body.removeClass('before-ir');
      $body.addClass('after-ir');
    }
    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
    $('.home').hide();
  }

  $('#before-IR-btn').on('click', function () {
    beforeIndustrialRevolution = true;
    initiateMothApp(beforeIndustrialRevolution);
  });

  $('#show-chart').on('click', function () {
    $('#chartContainer').toggleClass('hidden');
  });

  $('#after-IR-btn').on('click', function () {
    beforeIndustrialRevolution = false;
    initiateMothApp(beforeIndustrialRevolution);
  });


//  Debug mode
  $('#before-IR-btn').click();
});
