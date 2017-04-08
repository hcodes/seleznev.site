$(document).ready(function() {
    $('#effects span').click(function() {
        $('#effects span').removeClass('selected');
        $(this).addClass('selected');
        $('#img2, #img4').attr('src', './' + $(this).text().replace(/ /g, '_').toLowerCase() + '.jpg');
    });
});

$(window).on('load', function() {
    $('#container').hover(function() {
        $('#img1').stop().animate({opacity: 0}, 'slow');
    }, function() {
        $('#img1').stop().animate({opacity: 1}, 'slow');
    });
    
    $('#how').click(function() {$('#secret, #about-secret').toggle();})
});