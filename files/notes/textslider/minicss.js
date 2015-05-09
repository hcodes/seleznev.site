(function() {
    $(window).load(function() {
        var f = $('#field').draggable({drag: function() {
                var l = $(this).position().left,
                    t = $(this).position().top;
                $('#x').val(l);
                $('#y').val(t);
                $('#x, #y').change();
            }
        });
        
        if ($.browser.msie || $.browser.opera) {
            $('#ie-transform').hide();
        }
        
        $('#x').change(function() {
            f.css('left', this.value + 'px');
        });
        
        $('#y').change(function() {
            f.css('top', this.value + 'px');
        });        
        
        $('#w').change(function() {
            f.css('width', this.value + 'px');
        });        

        $('#h').change(function() {
            f.css('height', this.value + 'px');
        });        
        
        $('#fs').change(function() {
            f.css('font-size', this.value + 'px');
        });    
        
        $('#r, #g, #b').change(function() {
            var r = $('#r').val(),
                g = $('#g').val(),
                b = $('#b').val();
            f.css('color', 'rgb(' + r + ',' + g + ',' + b + ')');
        });            

        $('#rb, #gb, #bb').change(function() {
            var rb = $('#rb').val(),
                gb = $('#gb').val(),
                bb = $('#bb').val();
            f.css('background-color', 'rgb(' + rb + ',' + gb + ',' + bb + ')');
        });
        
        $('#padding').change(function() {
            f.css('padding', this.value + 'px');
        });    

        $('#margin').change(function() {
            f.css('margin', this.value + 'px');
        });    
        
        $('#border-width').change(function() {
            f.css('border-width', this.value + 'px');
        });
        
        $('#outline-width').change(function() {
            f.css('outline-width', this.value + 'px');
        });        
        
        $('#transform').change(function() {
            f.css('-moz-transform', 'rotate(' + this.value + 'deg)');
            f.css('-webkit-transform', 'rotate(' + this.value + 'deg)');
        });            

        $('input.textslider', $('#types, #css-editor')).not('#fs').textSlider();
        
        $('#fs').textSlider({min: 0, max: 100, step: 1,
            filterForCSS: function(value, data) {
                var obj = {};
                var minValue = data.min,
                    maxValue = data.max,
                    minSize = 10,
                    maxSize = 40;
                
                obj.fontSize = ((value - minValue) / (maxValue - minValue) * (maxSize - minSize) + minSize) + 'px';
                return obj;
            }
        });
    });
})(jQuery);