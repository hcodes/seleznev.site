var pa = {};

pa.speed = 'normal';
pa.globalId = '#pa-photos';
pa.images = null;

pa.imgSmallWidth = 200;
pa.imgSmallHeight = 133;

$(document).ready(function() {
    pa.init();
    $(document).mousemove(fmoveimg).mouseup(fmouseup);
});

$(window).load(function() {
    var i = 0;
    var width = 0;
    var height = 0;
    pa.images.each(function() {
        width += $(this).width();
        height += $(this).height();
        i++;
    });
    
    width /= i;
    height /= i;
    
    pa.imgSmallWidth = Math.floor(width);
    pa.imgSmallHeight = Math.floor(height);
});

pa.init = function() {
    $(pa.globalId + ' a').wrap('<div></div>');
    pa.images = $(pa.globalId + ' div');
    $('#pa-show-big').click(function() {
        $(this).hide();
        $('img', this)[0].src = '';
    });
    
    pa.images.each(function() {
        $(this).mousedown(fmousedown).click(function() {
            if (!mmove) {
                $(this).addClass('selected');
                $('#pa-big-img').show().get(0).src = $('a', this)[0].href;
                $('#pa-show-big').show();
            }
            
            return false;
        });
    });
    
    $('img', pa.images).mouseout(function() {
            $(this).css('opacity', 1);
        }).mouseover(function() {
            $(this).css('opacity', 0.8);
    });

    if (!pa.initCoords())    pa.figure.rnd();
}

pa.startArcanoid = function() {
    if ($('#pa-bat:visible').length)    return;
    $('#pa-ball, #pa-bat').show();
    pa.moveBall();
}

pa.finishArcanoid = function() {
    pa.images.css('opacity', '').data('pa_hide', false).show();
    $('#ball, #bat').hide();
}

pa.moveBall = function() {
    var el = $('#pa-ball');
    var x = el.position.left;
    var y = el.position.top;
    
    if (x < 0)    pa.moveBall.kx = 1;
    if (y < 0)    pa.moveBall.ky = 1;
    if (x > (getWindowWidth() - el.width()))    pa.moveBall.kx = -1;
    if (y > (getWindowHeight() - el.height()))    pa.moveBall.ky = -1;
    
    x += pa.moveBall.kx * pa.moveBall.v;
    y += pa.moveBall.ky * pa.moveBall.v;
    
    moveTo('#ball', x, y);
    
    var hided = 0;
    pa.images.each(function(i) {
        var el = $(this);
        var x1 = el.position.left;
        var y1 = el.position.top;
        
        if (x >= x1 && x <= (x1 + el.width())) {
            if (y >= y1 && y <= (y1 + el.height())) {
                if (this.offsetWidth)    hided++;
                $(this).hide();
            }
        }
    });
    
    if (hided == pa.images.length)    setTimeout(pa.finishArcanoid, 1000);
    else    setTimeout(pa.moveBall, 20);
}

pa.moveBall.v = 6;
pa.moveBall.kx = -1;
pa.moveBall.ky = -1;

pa.saveCoords = function(e) {
    var text = '';
    $.map(pa.images, function(item, i) {
        var el = pa.images.eq(i);
        if (!i)    text += ';';
        text += el.position.left + ',' + el.position.top + ',' + el.css('z-index');        
    });
    
    setCookie('pa.coords', text, getExpDate(30, 0, 0)); // 30 days
}

pa.initCoords = function() {
    var text = getCookie('pa.coords');
    if (!text)    return false;
    
    $.map(text.split(';'), function(item, i) { 
        // data = x, y, z-index
        var data = item.split(',');
        moveTo(pa.images.eq(i), data[0], data[1]);
        pa.images.css('z-index', data[2]);
    });
    
    return true;
}

pa.figure = {};
pa.figure.rnd = function (noanim) {
    pa.images.each(function() {
        var w = $(this).width();
        var x = getRandom(getWindowWidth() - w);
        var k = (x < w) ? w : 0;
        var y = k + getRandom(getWindowHeight() - $(this).height() - k);

        if (noanim) moveTo(this, x, y);
        else $(this).animate({left: x + 'px', top: y + 'px'}, pa.speed);

        $(this).css('z-index', getRandom(pa.images.length));
    });
}

pa.figure.line = function(noanim) {
    var x, y, k, id, z, it;
    
    var x = 200;
    var y = 50;
    var add = 60;
    var k = 1.1;
    var px = 200;
    
    pa.images.each(function(i) {
        y = k * x - px;

        if (noanim) moveTo(this, x, y);
        else $(this).animate({left: x + 'px', top: y + 'px'}, pa.speed);

        $(this).css('z-index', i);
        
        x += add;
    });
}

pa.figure.table = function(noanim) {
    var z = 0;
    var x = 0;
    var y = 0;
    
    alert(getWindowHeight());
    
    k = Math.floor(parseInt(getWindowWidth() / (pa.imgSmallWidth * 1.5)));
    
    if (k < 1)    k = 1;

    var kx = pa.imgSmallWidth * 1.5;
    var ky = pa.imgSmallHeight * 1.5;
    
    var px = 200;
    var py = 50;
    
    pa.images.each(function(i) {
        if (noanim) moveTo(this, x, y);
        else $(this).animate({left: x + 'px', top: y + 'px'}, pa.speed);

        $(this).css('z-index', i);
        
        if (x >= (k - 2)) {
            x = -1;
            y++;
        }
        
        x++;
    });
}

pa.figure.chess = function(noanim) {
    var x, y, kx, ky, id, z, sm;
    
    z = 0;
    x = 0;
    y = 0;
    
    sm = 0;
    
    k = Math.floor(parseInt(getWindowWidth() / (pa.imgSmallWidth + 30) / 2));
    
    if (k < 1)    k = 1;

    kx = pa.imgSmallWidth * 2 + 50;
    ky = pa.imgSmallHeight + 20;
    
    var px = 200;
    var py = 50;
    
    pa.images.each(function(i) {
        if (noanim) moveTo(this, x, y);
        else $(this).animate({left: x + 'px', top: y + 'px'}, pa.speed);

        $(this).css('z-index', i);
        
        if (x >= (k - 1)) {
            x = -1;
            y++;
            if (sm)    sm = 0;
            else    sm = 0.5;
        }
        
        x++;
    });
}

pa.figure.smile = function(noanim) {
    pa.images.each(function(i) {
        var x = pa.figure.smile.data[i][0];
        var y = pa.figure.smile.data[i][1];
    
        if (noanim) moveTo(this, x, y);
        else $(this).animate({left: x + 'px', top: y + 'px'}, pa.speed);

        $(this).css('z-index', i);
    });
}
pa.figure.smile.data = [[211,70], [665,70], [445,294], [63,405], [114,511], [230,605], [405,636], [562,628], [716,573], [787,515], [865,411]];

function getMaxZIndex() {
    var max = 0;
    pa.images.each(function() {
        var z = parseInt($(this).css('z-index'));
        if (z > max)    max = z;
    });

    return max;
}

var drag = false;
var deltax = 0;
var deltay = 0;
var currentObj = null;
var mmove = true;
var mousex = 0;
var mousey = 0;

function fmousedown(e) {
    drag = true;

    var x = e.pageX, y = e.pageY;
    
    currentObj = this;
    if (currentObj.parentNode.parentNode.id == 'pa-photos') {
        currentObj = null;
        drag = false;
    }
    else {
        currentObj.style.zIndex = parseInt(getMaxZIndex()) + 1;
    }
    
    if (currentObj) {
        deltax = x - $(currentObj).position.left;
        deltay = y - $(currentObj).position.top;
    }
    
    mousex = x;
    mousey = y;
    
    return false;
}

function fmouseup(e) {
    fmoveimg(e);
    drag = false;

    var x = e.pageX, y = e.pageY;

    if (x == mousex && y == mousey)    mmove = false;
    else if (currentObj && currentObj.id) {
        mmove = true;
        var iner = new Inercia(currentObj, old3mousex, old3mousey, x, y, old3t, nowTimestamp());
        
        iner.start();
        
        mousex = x;
        mousey = y;
        
        return false;
    }
    
    mousex = x;
    mousey = y;
    
    return true;
}

var oldmousex = 0;
var oldmousey = 0;

var old2mousex = 0;
var old2mousey = 0;

var old3mousex = 0;
var old3mousey = 0;


var old3t = 0;
var old2t = 0;
var oldt = 0;

function fmoveimg(e) {
    var x = e.pageX, y = e.pageY;
    if ($('#bat:visible').length) {
        var buf = (x + $('#bat').width() > getWindowWidth()) ? (getWindowWidth() - $('#bat').width()) : x;
        $('#bat').css('left', buf + 'px');
    }
    
    old3mousex = old2mousex;
    old3mousey = old2mousey;
    
    old2mousex = oldmousex;
    old2mousey = oldmousey;
    
    oldmousex = x;
    oldmousey = y;
    
    old3t = old2t;
    old2t = oldt;
    oldt = nowTimestamp();
    
    if (drag && currentObj)             {
        moveTo(currentObj, x - deltax, y - deltay);
        return false;
    }
    
    return true;
}

function nowTimestamp() {
    return (new Date()).getTime();
}