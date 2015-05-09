/* Text smoke v1.0
 * © 2008 Denis Seleznev, info@webfilin.ru
 */

(function($) {
    var startRGB = [255, 224, 31],
        endRGB = [242, 0, 0],
        dy = [], sx = [], sy = [], ss = [];
        
    var DELTA = 25,
        MIN_FONT_SIZE = 10,
        MAX_FONT_SIZE = 50;
        
    var els, smokeHeight, y;

    $(document).ready(function() {
        function init() {
            els = $('div.smoke div');
            y = smokeHeight = $('div.smoke-container').height();
            
            els.each(function(i) {
                var inner = this.innerHTML,
                    text = '';
                for (var n = 0; n < inner.length; n++) {
                    text += '<span>' + inner.charAt(n) + '</span>';
                }
                this.innerHTML = text;
                
                sx[i] = [];
                ss[i] = $('span', this);
                dy[i] = this.offsetTop;
                this.style.top = dy[i] + 'px';
                
                for (var k = 0; k < ss[i].length; k++) {
                    sx[i][k] = ss[i][k].offsetLeft;
                }
            });
            
            $('div.smoke').addClass('smoke-a');
            $('div.smoke-container').addClass('smoke-container-a');    
        }
        
        init();

        function anim() {
            y--;
            var by;
            for (var i = 0; i < ss.length; i++) {        
                by = y + dy[i];
                if (by > (smokeHeight - DELTA) && by < smokeHeight) {
                    if (by != (smokeHeight - DELTA + 1)) {
                        for (var n = 0; n < ss[i].length; n++) {
                            ss[i][n].style.left = Math.floor((smokeHeight - by) * sx[i][n] / DELTA) + 'px';
                        }
                    }
                    else {
                        els[i].className = 'all-s';
                    }
                }
            
                els[i].style.top = by + 'px';
                
                if (by > -MAX_FONT_SIZE && by < smokeHeight) {
                    els[i].style.left = Math.cos(2 * Math.PI * by /200) * 50 + 'px';
                    els[i].style.color = textrgb(icolor(startRGB, endRGB, 0, smokeHeight, by));
                    els[i].style.fontSize = fontZoomer(0, smokeHeight, by) + 'px';
                    $(els[i]).removeClass('all-hide');
                }    
                else {
                    $(els[i]).addClass('all-hide');
                }
            }
            
            if (y > (-1 * smokeHeight)) {
                setTimeout(anim, 20);
            }
        }
        
        anim();

        function textrgb(rgb3) {
            return 'rgb(' + rgb3[0] + ',' + rgb3[1] + ',' + rgb3[2]+')';
        }

        function icolor(rgb1, rgb2, y1, y2, y) {
            var rgb3 = [];
            
            rgb3[0] = interpolation(rgb1[0], rgb2[0], y1, y2, y);
            rgb3[1] = interpolation(rgb1[1], rgb2[1], y1, y2, y);
            rgb3[2] = interpolation(rgb1[2], rgb2[2], y1, y2, y);
            
            return rgb3;
        }

        function interpolation(r1, r2, y1, y2, y) {
            var r3;
            if (r1 == r2) {
                r3 = r2;
            }
            else {
                r3 = Math.floor((r2 - r1) / (y2 - y1) * (y - y1) + r1);
            }

            return r3;
        }

        function fontZoomer(y1, y2, y) {
            var s1 = MIN_FONT_SIZE, s2 = MAX_FONT_SIZE;

            if (y1 == y2)    return s1;

            var ym = (y2 - y1) / 2,       
                f = s1;
            if (y < ym) {
                f = (s2 - s1) / (y2 - ym) * (y - y1) + s1;
            }
            else {
                f = s1 + (s2 - s1) / (y2 - ym) * (y2 - y);
            }
            
            return f;
        }
    });
})(jQuery);