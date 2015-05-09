$(window).load(function() {
    var pad = 0;
    var hdiv = 5;
    
    var step = 1;
    var period = 40;
    var nPeriod = 0;
    var minLen = 10;
    var nCol = 0;
    
    var colors = [{r: 255, g: 255, b: 255}, {r: 0, g: 255, b: 255}, {r: 255, g: 0, b: 255}, {r: 255, g: 255, b: 0}];
    /*for (var m = 0; m < 20; m++) {
        colors.push({r:getRandom(255), g:getRandom(255), b:getRandom(255)});
    }*/
    
    colors.push(colors[0]);
    var height = $('#rainbow').height() - pad * 2;
    var len = Math.floor(height / hdiv) ;
    
    if (len < minLen)    len = minLen;
    
    var col = new Array(len);
    var text = '';
    for (var i = 0; i < len; i++) {
        col[i] = colors[nCol]; 
        text += '<div style="top:' + (pad + hdiv * i) + 'px; background:rgb(' + col[i].r + ',' + col[i].g + ',' + col[i].b + ')"></div>';
    }
    
    var rHeight = $('#rainbow').height();
    $('#rainbow').html(text);
    $('#rainbow div:last').height(rHeight - (len - 1) * hdiv);
    
    setInterval(rainbowProc, 30);
    
    function rainbowProc() {
        nPeriod += step;
        if (nPeriod > period) {
            nCol++;
            nPeriod = 0;
        }
        
        if (nCol > colors.length - 2) {
            nCol = 0;
        }
        
        col = popPush(col, rgbInterpolation(colors[nCol], colors[nCol + 1], nPeriod, period));

        var e = $('#rainbow div');
        for (var i = e.length - 1; i >= 0; i--) {
            e[i].style.background = 'rgb(' + col[i].r + ',' + col[i].g + ',' + col[i].b + ')';
        }
    }
    
    $('#plus').click(function() {
        period += 5;
        if (period >= 100)    this.disabled = true;
        $('#minus')[0].disabled = false;
        
        showPeriod(period);
    });
    
    $('#minus').click(function() {
        period -= 5;
        
        if (period <= 10)    {
            period = 10;
            this.disabled = true;
        }
        $('#plus')[0].disabled = false;
        
        showPeriod(period);
    });
    
    showPeriod(period);
    
    $('#plus, #minus').each(function() {this.disabled = false;});
});

function showPeriod(n) {    
    $('#control span').text(n);
}

function popPush(a, ob) {
    for (var i = 0; i < a.length - 1; i++) {
        a[i] = a[i + 1];
    }
    
    a[a.length - 1] = ob;
    
    return a;
}

function rgbInterpolation(c1, c2, n, period) {
    function rgbc(beg, end, n, period) {
        return Math.floor(beg + n / period * (end - beg));
    }

    return {r: rgbc(c1.r, c2.r, n, period), g: rgbc(c1.g, c2.g, n, period), b: rgbc(c1.b, c2.b, n, period)};
}

function getRandom(n) {
    return Math.floor(Math.random()*n);
}