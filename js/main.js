$(function(argument) {

    var $moth = $('.moth');

    $moth.on('click', function() {
        $(this).remove();
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


    var loop = false;
    var easing = 'linear';
    var direction = 'alternate';

    anime({
        targets: '.moth',
        translateX: 470,
        translateY: 100,
        easing,
        loop,
        direction,
        background: [{
            value: '#333333'
        }]
    })

    var mothTimeLine = anime.timeline({
        loop,
        direction
    });

    mothTimeLine
        .add({
            targets: '.moth',
            translateY: 100,
            translateX: 470,
            easing
        }).add({
            delay: 4000,
            targets: '.moth',
            translateY: 0,
            translateX: 250,
            easing
        }).add({
            targets: '.moth',
            translateY: '-80',
            translateX: 470,
            easing
        });


});