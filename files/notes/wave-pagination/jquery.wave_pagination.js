/*
 * Wave pagination v1.1
 * http://webfilin.ru/notes/wave-pagination/ 
 *
 * Idea by Sergey Cashin, cashin@cashin.ru
 * Realization by Denis Seleznev, info@webfilin.ru
 * Dual licensed under the MIT and GPL licenses
 *
 * Date: 15.05.2011
 */
 
(function($) {
    $(document).ready(function() {    
        function fontInterpolation(f) {
            return minFont + f / N_WAVE * (maxFont - minFont);
        }

        function fontTop(f) {
            return Math.floor(f - minFont) / 2;
        }
        
        var context = $('#wave-pagination');
        var mover = $('.wave-pagination__mover', context);
        var els =  $('*', mover);
        if (!els.length)    return false;

        // length of wave
        var N_WAVE = 3,
        minFont = parseInt($('a:first', mover).css('font-size')),
        mul = 2,
        maxFont = minFont * mul,
        pad = parseInt($('a:first', mover).css('padding-left')) * mul,
        widthGradient = $('.wave-pagination__left-gradient', context).width(),
        elsLeft = [],
        oldN = -1,
        selectedN = -1,
        clsPage = true;
        
        // fixer height
        mover.append('<em style="visibility:hidden; text-decoration:underline; font-size:' + maxFont + 'px">1234567890<\/em>');
        
        els.each(function (i) {
            var el = $(this);
            elsLeft[i] = el.position().left;
            if (el.hasClass('wave-pagination__selected'))    selectedN = i;
            if (i == els.length - 1 && i)    elsLeft[i + 1] = 2 * el.position().left - $(els[i - 1]).position().left;
        });

        $(document).mousemove(function () {
            if (clsPage) {
                els.removeClass('wave-pagination__selected wave-pagination__link').css({fontSize: '', paddingLeft: '', paddingRight: '', top: ''});
                mover.css('left', '');
                if (selectedN != -1) {
                    $(els[selectedN]).removeClass('wave-pagination__link').addClass('wave-pagination__selected').css({fontSize: '', paddingLeft: '', paddingRight: ''});
                }
                
                $('.wave-pagination__left-gradient, .wave-pagination__right-gradient', context).css('visibility', 'visible');
                
                clsPage = false;
                oldN = -1;
            }
        });
        
        $(context).mousemove(function (e) {    
            clsPage = true;
            
            var x = e.pageX - $(this).offset().left;
            if (x < widthGradient)    $('.wave-pagination__left-gradient', context).hide();
            else    $('.wave-pagination__left-gradient', context).show();

            var w = $(this).width() - widthGradient;
            if (x > w)    $('.wave-pagination__right-gradient', context).hide();
            else    $('.wave-pagination__right-gradient', context).show();
            
            var i, num = -1;
            for (i = 0; i < els.length; i++) {
                if (x > elsLeft[i] && x <= elsLeft[i + 1]) {
                    num = i;
                    break;
                }
            }
            
            if (num == -1)    return true;
            if (num == oldN)    return false;

            for (i = oldN; i < oldN + N_WAVE && i < els.length; i++) {
                $(els[i]).removeClass('wave-pagination__selected wave-pagination__link').css({fontSize: '', paddingLeft: '', paddingRight: '', top: ''});
            }
            
            for (i = oldN; i > oldN - N_WAVE && i >= 0; i--) {
                $(els[i]).removeClass('wave-pagination__selected wave-pagination__link').css({fontSize: '', paddingLeft: '', paddingRight: '', top: ''});
            }    

            var n = N_WAVE, fi;
            for (i = num; i < num + N_WAVE && i < els.length; i++) {
                fi = fontInterpolation(n);
                $(els[i]).removeClass('wave-pagination__selected wave-pagination__link').css({
                    fontSize: fi + 'px',
                    paddingLeft: pad + 'px',
                    paddingRight: pad + 'px',    
                    top: fontTop(fi) + 'px'});
                n--;
            }
            
            var n = N_WAVE - 1;
            for (i = num - 1; i > num - N_WAVE && i > 0; i--) {
                fi = fontInterpolation(n);
                $(els[i]).removeClass('wave-pagination__selected wave-pagination__link').css({
                    fontSize: fi + 'px',
                    paddingLeft: pad + 'px',
                    paddingRight: pad + 'px',
                    top: fontTop(fi) + 'px'});
                n--;
            }
            
            var el = $(els[num]);
            el.removeClass('wave-pagination__selected').addClass('wave-pagination__link');
            if (selectedN)    $(els[selectedN]).removeClass('wave-pagination__link').addClass('wave-pagination__selected');
            var left = Math.floor(elsLeft[num] - el.position().left - el.width() / 4);
            mover.css('left', left + 'px');
            oldN = num;
            
            return false;
        });

        return true;
    });
})(jQuery);