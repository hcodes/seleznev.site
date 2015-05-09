$(document).ready(function() {
    var STEP = 5;
    var TIMER = 30;

    var imgs = $('#plasma img');
    var len = imgs.length;
    var n = 0;
    var oldn = len - 1;
    var opacity = 100;
    var direct = 1;

    function goTimer() {
        
        opacity -= STEP;
        
        if (opacity < 0) {
            oldn = n;
            imgs.eq(oldn).css('z-index', 3).css('opacity', '1.0').show();
            
            n += direct;
            
            if (n >= len) {
                n = len - 2;
                direct = -1;
            }
            
            if (n < 0) {
                n = 1;
                direct = 1;
            }
            
            opacity = 100;

            imgs.eq(n).css('z-index', 2).css('opacity', '1.0').show();
        }
        
        imgs.eq(oldn).css('z-index', 3).css('opacity', opacity / 100);
        
        setTimeout(goTimer, TIMER);
    }
    
    function rndColor() {
        $('#hint').css('color', 'rgb(' + (75 + getRandom(170)) + ',' + (75 + getRandom(170)) + ',' + (75 + getRandom(170)) + ')');  
    }
    
    function getRandom(n) {
        return Math.floor(Math.random() * n);
    }

    var hPreloader = setInterval(rndColor, 50);
    
    $(window).load(function () {
        $('#hint').hide();
        clearTimeout(hPreloader);

        imgs.eq(0).css('z-index', 2).show();
        imgs.eq(len - 1).css('z-index', 3).show();

        goTimer();
    });
});