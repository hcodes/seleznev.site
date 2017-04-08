$(window).on('load', function() {
    var width = 600;
    var height = 800;
    var timer = 2000;


    var side1 = true;
    var side2 = true;
    var side3 = true;
    var side4 = true;

    $('input:button').each(function () {this.disabled = false;});

    var text = '';
    for (var i = 0; i < width; i++)    text += '<div></div>';

    $('#many').html(text);

    $('#many div').each(function(i) {
        this.style.backgroundPosition = '-' + i + 'px 0px';
        this.style.left = i + 'px';
    });

    $('#button1').click(function() {
        if (side1) {
            $('#many div').each(function(i) {
                if (i < width) {
                    $(this).animate({left: (width - i) + 'px', top: 0, height: Math.floor(height / 2 + getRandom(height / 2)) + 'px'}, timer + getRandom(timer / 2)).css('z-index', '2');
                }
            });
        }
        else {
            $('#many div').each(function(i) {
                $(this).animate({left: i + 'px', top: 0, height: height + 'px'}, timer + getRandom(timer / 2));
            });
        }

        side1 = !side1;
    });

    $('#button2').click(function() {
        if (side2) {
            $('#many div').each(function(i) {
                if (i < width) {
                    $(this).animate({left: (width - i) + 'px', top: i + 'px'}, timer + getRandom(timer / 2)).css('z-index', '2');
                }
            });
        }
        else {
            $('#many div').each(function(i) {
                $(this).animate({left: i + 'px', top: 0, height: height + 'px'}, timer + getRandom(timer / 2));
            });
        }

        side2 = !side2;
    });

    $('#button3').click(function() {
        if (side3) {
            $('#many div').each(function(i) {
                if (i < width) {
                    $(this).animate({top: i + 'px'}, timer);
                }
            });
        }
        else
        {
            $('#many div').each(function(i) {
                $(this).animate({top: 0}, timer + getRandom(timer / 2));
            });
        }

        side3 = !side3;
    });

    $('#button4').click(function() {
        if (side4) {
            $('#many div').each(function(i) {
                if (i < width) {
                    if (i < width / 2) {
                        $(this).animate({opacity: i / (width / 2)}, timer);
                    }
                    else {
                        $(this).animate({opacity: (width - i) / (width / 2)}, timer);
                    }
                }
            });
        }
        else
        {
            $('#many div').each(function(i) {
                $(this).animate({opacity: 1}, timer);
            });
        }

        side4 = !side4;
    });

    $('#button5').click(function() {

        if (hTimer) {
            clearTimeout(hTimer);
            hTimer = null;
            $('input:button').each(function () {this.disabled = false;});
            $('#many div').each(function(i) {
                this.style.top = '0';
            });
        }
        else {
            sinMove();
            $('input:button').not('#button5').each(function () {this.disabled = true;});
        }
    });

});


var step = 10;
var hTimer = null;

function sinMove() {
    step += 10;

    $('#many div').each(function(i) {
        this.style.top = (Math.cos(2 * Math.PI * (i + step) / 1000) * 100) + 'px';
    });

    hTimer = setTimeout(sinMove, 50);
}

function cageMove() {
    step += 10;

    $('#many div').each(function(i) {
        this.style.top = (Math.cos(2 * Math.PI * (i + step) / 1000) * 100) + 'px';
    });

    setTimeout(sinMove, 50);
}

function getRandom(n) {
    return Math.floor(Math.random()*n);
}