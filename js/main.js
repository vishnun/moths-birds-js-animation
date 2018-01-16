$(function(argument) {

  $('#before-IR-btn').on('click', function() {
    $('body').removeClass('after-ir');
    $('body').addClass('before-ir');

    var beforeIndustrialRevolution = true;
    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
    $('.home').hide();
  });

  $('#after-IR-btn').on('click', function() {
    $('body').addClass('after-ir');
    $('body').removeClass('before-ir');

    var beforeIndustrialRevolution = false;
    var mothApp = new MothApp(beforeIndustrialRevolution);
    mothApp.init();
    $('.moth-simulator').removeClass('hidden');
    $('.home').hide();
  });

});
