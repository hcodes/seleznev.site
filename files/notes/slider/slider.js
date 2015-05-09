(function($) {
    $(document).ready(function() {
        function rebuild(i) {
            if (!i)    pos = 0;
            if (anim) $(this).animate({left: pos + 'px'}, 'normal');
            else $(this).css({left: pos + 'px', zIndex: i});
            
            pos += (active == i) ? activeWidth : ((width < 1) ? 1 : width);
        }
        
        var slider = $('#slider');
        var els = $('div', slider);
        var active = els.index($('div.active'));
        var activeWidth, width, pos, anim = true;
        
        $(window).resize(function() {
            activeWidth = els.eq(active).width();
            width = Math.ceil((slider.width() - activeWidth) / (els.length - 1));
            els.stop().each(rebuild);
        }).resize();
        
        els.mouseout(function() {
            $(this).removeClass('hover');
        }).mouseover(function() {
            $(this).addClass('hover');
        }).click(function() {
            els.stop().eq(active).removeClass('active').end().eq(active = els.index(this)).addClass('active').end().each(rebuild);
        });
    });
})(jQuery);