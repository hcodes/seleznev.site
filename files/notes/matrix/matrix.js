function getRandom(n) {
    return Math.floor(Math.random() * n);
}

function step1() {
    var pos = 0,
        flag = true;

    function showInput() {
        var text = 'Проснись,                            следуй за желтым кроликом.                   ',
            res = '';

        for (var i = 0; i < text.length && i < pos; i++) {
                res += text.charAt(i);
        }
        res += (pos >= text.length) ? '' : ((flag) ? '' : '<span class="space">|</span>');

        $('#wake-up').html(res);
        flag = !flag;
        pos++;

        if (pos <= text.length) setTimeout(showInput, 100);
    }

    showInput();

    setTimeout(function() {
        $('#wake-up').hide();
        $('#yandex, #letters').show('normal');
        step2();
    }, 8500);
}

function showMatrix() {
    var sw = $('#container').width(),
        t = '',
        text = [],
        speeds = [],
        speedsY = [],
        white = [],
        left = 0,
        w = $('body').width(),
        h = $('body').height();

    while(left < w) {
        t = '';
        var fs = 10 + getRandom(30);
        for (var k = 0; k < h / fs; k++) {
            t += '<div>' + String.fromCharCode(32 + getRandom(100)) + '</div>';
        }

        $('#buf-letter').text('M').css('font-size',  fs + 'px').css('width', '1em');
        left += $('#buf-letter').width() * 1.7;
        text.push('<div class="m' + getRandom(6) + '" style="top:-'+(fs * 30 + getRandom(fs * 30))+'px; font-size:' + fs + 'px; left:' + left + 'px; z-index:' + fs + ';">' + t + '</div>');


        speeds.push((31 - fs) * 3);
        speedsY.push((31 - fs * 2) * 3);
        if (!getRandom(4)) {
            white.push(getRandom(100));
        }
        else {
            white.push(-1);
        }
    }

    $('#letters').html(text.join(''));

    var divs = $('#letters > div'),
        cache = [];

    setInterval(function() {
        divs.each(function(i) {
            if (this.offsetTop > h) {
                this.style.top = '-' + this.offsetHeight + 'px';
            }
            else {
                this.style.top = (this.offsetTop + (parseInt($(this).css('font-size'))) / 4) + 'px';
            }

            if (white[i] != -1) {
                var d;
                if (cache[i]) {
                    d = cache[i];
                }
                else {
                    cache[i] = d = $('div', this);
                }

                d.eq(white[i] - 4).attr('class', '');
                white[i] += 1;
                d.eq(white[i] - 3).attr('class', 'l3');
                d.eq(white[i] - 2).attr('class', 'l2');
                d.eq(white[i] - 1).attr('class', 'l1');
                d.eq(white[i]).attr('class', 'l0');
                d.eq(white[i] + 1).attr('class', 'l1');
                d.eq(white[i] + 2).attr('class', 'l2');
                d.eq(white[i] + 3).attr('class', 'l3');

                if (white[i] >= 100) {
                    white[i] = 0;
                }
            }
        });
    }, 30);


    setInterval(function() {
        divs.each(function(i) {
            $(this).animate({left: getRandom(sw) + 'px'}, 3000);
        });
    }, 30000);
}

function step2() {
    $('#yandex').animate({left: '50%'}, 2000);
    $('#yandex > div').animate({right: 0}, 2000);

    setTimeout(function() {
        $('#letters').css('opacity', 0);
        showMatrix();
        $('#letters').animate({opacity: 1}, 3500);
    }, 4000);

    var c = 0;

    function colorize() {
        $('#yandex span').css('color', 'rgb(255,' + (255 - c) + ',' + (255 - c) + ')');

        if (c != 255) {
            setTimeout(colorize, 20);
        }

        c += 2;
    }

    colorize();
}

$(window).on('load', function() {
    step1();
});