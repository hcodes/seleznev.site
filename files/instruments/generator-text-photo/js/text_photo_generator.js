// Text photo generator v1.0
// © 2009 Denis Seleznev, info@webfilin.ru, http://webfilin.ru

$(document).ready(function() {
    $('textarea').focus();
    
    $('#prefs').draggable();
    
    $('#prefs h2 span').click(function() {
        if ($('#prefs div.pad').toggle().is(':visible')) $('#prefs h2 span').text('Свернуть');
        else $('#prefs h2 span').text('Развернуть');
    })
    
    $('#http, #file, #ftp').click(function() {
        $('#image').val($(this).text());
    });
    
    $('#generate').click(function() {
        if ($.trim($('#text').val()) == '') {
            alert('Пожалуйста, введите текст.');
            $('#text').focus();
            
            return false;
        }
        
        $('form #data').val(generateTextPhoto());
        $('form').submit();
    });
    
    $('#select-font-family').click(function() {
        $('#fonts').toggle();
        
        if ($('#fonts').is(':hidden')) {
            this.value = '↓';
        }
        else {
            this.value = '↑';
        }
    });
    
    $('#clear').click(function() {
        $('#text').val('');
    });
    
    $('#fonts span.ajax').click(function() {
        $('#font-family').val($(this).text());
        $('#fonts span').removeClass('select').addClass('ajax');
        $(this).removeClass('ajax').addClass('select');
        isCorrectData();
    });
    
    $('#italic, #bold').click(isCorrectData);
    $('#underline, #through').click(function() {
        if (this == $('#underline')[0])    $('#through')[0].checked = false;
        if (this == $('#through')[0])    $('#underline')[0].checked = false;
        isCorrectData();
    });
    
    setKeyboardEvents('#font-size, #width, #height, #font-family, #line-height, #bg-color');
    $('#image').blur(isCorrectData).focus(isCorrectData);
    
    $('#show-more-prefs').click(function() {
        $('#more-prefs').toggle();
    });
    
    function setKeyboardEvents(el) {
        $(el).keyup(isCorrectData).keypress(isCorrectData).blur(isCorrectData).focus(isCorrectData);
    }
});

var jsx = '';
$(window).on('load', function() {
    var text = $('#font-family').val();
    $('#fonts span').each(function() {
        if ($(this).text() == text)    $(this).removeClass('ajax').addClass('select');
    });
    
    isCorrectData();
    $.get('./js/text_photo_photoshop.js', null, function(data) {jsx = data;});
})

function isCorrectData() {
    var error = false;

    var width = $('#width').val();
    if (width.search(/[^0-9]/) != -1 || width == '') {
        $('#width').addClass('error');
        error = true;
    }
    else {
        $('#width').removeClass('error');
        $('#photo, #text, #text-photo').width(width + 'px');
    }

    var height = $('#height').val();
    if (height.search(/[^0-9]/) != -1 || height == '') {
        $('#height').addClass('error');
        error = true;
    }
    else {
        $('#height').removeClass('error');
        $('#photo, #text, #text-photo').height(height + 'px');
    }

    var lineHeight = $('#line-height').val();
    if (lineHeight.search(/[^0-9]/) != -1 || lineHeight == '') {
        $('#line-height').addClass('error');
        error = true;
    }
    else {
        $('#line-height').removeClass('error');
        $('#photo, #text, #text-photo').css('line-height', lineHeight + 'px');
    }    


    var fontSize = $('#font-size').val();
    if (fontSize.search(/[^0-9]/) != -1 || fontSize == '') {
        $('#font-size').addClass('error');
        error = true;
    }
    else {
        $('#font-size').removeClass('error');
        $('#photo, #text, #text-photo').css('font-size', fontSize + 'px');
    }
    
    var fontFamily = $('#font-family').val();
    $('#photo, #text, #text-photo').css('font-family', fontFamily);

    $('#photo').css('background-image', 'none');
    $('#photo').css('background', 'url("'+ $('#image').val() + '") top left no-repeat');

    var bgColor = $('#bg-color').val().replace(/#/, '');
    if (bgColor.search(/[^0-9a-f]/) != -1 || (bgColor.length != 3 && bgColor.length != 6)) {
        $('#bg-color').addClass('error');
        error = true;
    }
    else {
        $('#bg-color').removeClass('error');
        $('body, html').css('background', '#' + bgColor);
    }
    
    if ($('#italic')[0].checked) {
        $('#photo, #text, #text-photo').css('font-style', 'italic');
    }
    else {
        $('#photo, #text, #text-photo').css('font-style', '');
    }

    if ($('#bold')[0].checked) {
        $('#photo, #text, #text-photo').css('font-weight', 'bold');
    }
    else {
        $('#photo, #text, #text-photo').css('font-weight', 'normal');
    }
    
    if (!$('#underline')[0].checked && !$('#through')[0].checked) {
        $('#photo, #text, #text-photo').css('text-decoration', 'none');
    }
    else {
        if ($('#through')[0].checked) {
            $('#photo, #text, #text-photo').css('text-decoration', 'line-through');
        }    
        if ($('#underline')[0].checked) {
            $('#photo, #text, #text-photo').css('text-decoration', 'underline');
        }    
    }    

    if (error)    {
        $('#prefs div.pad').show();
        $('#generate')[0].disabled = true; 
    }
    else {
        $('#generate')[0].disabled = false; 
    }
    
    return true;
}

function generateTextPhoto() {
    function getTop(el) {
        var il = 0;
        while(el.tagName != 'BODY' && el.tagName != 'HTML') {
            il += el.offsetTop;
            el = el.offsetParent;
        }
        il += el.offsetTop;
        
        return il;
    }

    function getLeft(el) {
        var il=0;

        while(el.tagName != 'BODY' && el.tagName != 'HTML') {
            il += el.offsetLeft;
            el = el.offsetParent;
        }
        il += el.offsetLeft;

        return il;
    }

    if (!isCorrectData())    {
        return false;
    }    

    var text = '';
    $('#control, #photo').hide();
    var fish = $('#text').val();
    for (var i = 0; i < fish.length; i++) {
        switch (fish.charAt(i)) {
            case "\r":
                continue;
            case "\n": {
                text += '<br />';
            }
            break;
            case "<": {
                text += '<span>&lt;</span>';
            }
            break;
            case ">": {
                text += '<span>&gt;</span>';
            }
            break;
            case "@": {
                text += '<span>&amp;</span>';
            }
            break;
            case '\'': {
                text += '<span>\\\'</span>';
            }
            break;
            default: {
                text += '<span>' + fish.charAt(i) + '</span>';
            }
            
            break;
        }
    }
    
    $('#text-photo').html(text).show();
    
    var span = $('#text-photo span');
    
    var imageWidth = $('#width').val();
    var imageHeight = $('#height').val();
    var fontSize = $('#font-size').val();
    var lineHeight = $('#line-height').val();
    var fontFamily = $('#font-family').val().replace(/"/g, '&quot;');
    var bgColor = $('#bg-color').val();
    var styleBold = ($('#bold')[0].checked) ? 'true' : 'false';
    var styleUnderline = ($('#underline')[0].checked) ? 'true' : 'false';
    var styleItalic = ($('#italic')[0].checked) ? 'true' : 'false';
    var styleThrough = ($('#through')[0].checked) ? 'true' : 'false';
    var formatData = 'html';

    if ($('#js')[0].checked) {
        formatData = 'js';
    }
    
    var texta = [];
    texta[0] = 'var textPhotoData={width:' + imageWidth +
                ', height:' + imageHeight +
                ', formatData:"' + formatData + '"' +
                ', backgroundColor:"' + bgColor +
                '", fontSize:' + fontSize +
                ', fontFamily:"' + fontFamily +
                '", styleItalic:' + styleItalic +
                ', styleUnderline:' + styleUnderline +
                ', styleBold:' + styleBold +
                ', styleThrough:' + styleThrough +
                ', lineHeight:' + lineHeight + ', data:[';
    var y, t, finishFill = false;
    var k = 0;
    for (var i = 0; i < span.length; i++) {
        if (!span[i].offsetWidth)    continue;
        t = getTop(span[i]);
        
        if (t >= imageHeight) {
            finishFill = true;
            break;
        }
        
        if (i) {
            texta[k] += ', ';
        }

        if (y != t && typeof y != 'undefined')    {
            texta[k] += "{br:true}, \n";
            k++;
            texta[k] = '';
        }

        texta[k] += '{letter:"' + span[i].innerHTML +
                '", left:' + getLeft(span[i]) +
                ', top:' + t +
                ', width:' + span[i].offsetWidth +
                ', height:' + span[i].offsetHeight + '}';
        y = t;
        
    }

    texta[k] += ']};';

    $('body, html').css('background-color', '#000');
    $('#text-photo, #control, #photo').html('').hide();
    
    // uFEFF - BOM UTF-8
    return "\uFEFF" + texta.join('') + jsx;
}