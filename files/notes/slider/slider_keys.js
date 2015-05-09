(function($) {
    $(document).ready(function() {
        function rebuild(i) {
            if (!i)    pos = 0;
            if (anim) {
                $(this).animate({left: pos + 'px'}, 'normal');
            }
            else {
                $(this).css({left: pos + 'px', zIndex: i});
            }
            
            pos += (active == i) ? activeWidth : width;
        }
        
        function resize() {
            activeWidth = els.eq(active).width();
            width = Math.ceil((slider.width() - activeWidth) / (els.length - 1));
            if (width < 1) width = 1;
            els.stop().each(rebuild);
        }
        
        var slider = $('#slider');
        var els = $('div', slider);
        var active = els.index($('div.active'));
        var activeWidth, width, pos, anim = true;
        
        $(window).resize(resize);
        resize();
        
        els.mouseout(function() {
            $(this).removeClass('hover');
        }).mouseover(function() {
            $(this).addClass('hover');
        }).click(function() {
            els.stop().eq(active).removeClass('active').end().eq(active = els.index(this)).addClass('active').end().each(rebuild);
        });
        
        $(document).keydown(function(e) {
            var KEY_CURSOR_LEFT = 37, KEY_CURSOR_RIGHT = 39;
            var oldActive = active;
            if (e.keyCode == KEY_CURSOR_LEFT && active)    active--;
            else if (e.keyCode == KEY_CURSOR_RIGHT && active < (els.length - 1))    active++;
            
            rebuildKey(oldActive, active);
        });
        
        function catchWheel(e) {
            var ua = window.navigator.userAgent.toLowerCase();
            var isk = false;

            if (ua.indexOf('safari') != -1 || ua.indexOf('khtml') != -1)    isk = true;
            var target = window, event = (document.all || window.opera || isk) ? (target = document, 'mousewheel') : 'DOMMouseScroll';

            if (e.type == 'mouseover')    $(target).bind(event, mouseWheel);
            else    $(target).unbind(event, mouseWheel);
        }
        
        function mouseWheel(e) {
            var delta = 0;
            if (e.detail)    delta = e.detail / 3;
            else if (e.wheelDelta)    delta = e.wheelDelta / 120;
            
            var oldActive = active;
            if (delta > 0) {
                if (active < els.length - 1)    active++;
            }
            else {
                if (active > 0) active--;
            }

            rebuildKey(oldActive, active);
        }
        
        function rebuildKey(oldActive, active) {
            anim = false;
            els.eq(oldActive).removeClass('active').end().eq(active).addClass('active').end().each(rebuild);
            anim = true;
        }

        slider.mouseover(catchWheel).mouseout(catchWheel);
    });
})(jQuery);