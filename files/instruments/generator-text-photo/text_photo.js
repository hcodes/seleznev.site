// © 2008 Denis Seleznev, info@webfilin.ru, www.webfilin.ru
// Viewer text photo v1.0

function textPhoto(id, obj, inverse) {
    if (typeof obj == 'undefined') {
        if (typeof textPhotoData == 'undefined')    return false;
        obj = textPhotoData;
    }
    
    if (typeof id == 'undefined')    return false;
    
    var tel;
    if (typeof id == 'string') {
        tel = document.getElementById(id);
        if (!tel)    return false;
    }
    else {
        tel = id;
    }
    
    tel.style.width = obj.width + 'px';
    tel.style.height = obj.height + 'px';
    tel.style.backgroundColor = obj.backgroundColor;
    tel.style.fontSize = obj.fontSize + 'px';
    tel.style.lineHeight = obj.lineHeight + 'px';
    tel.style.fontFamily = obj.fontFamily.replace(/&quot;/g, '"');
    if (obj.styleItalic)    tel.style.fontStyle = 'italic';
    if (obj.styleUnderline)    tel.style.textDecoration = 'underline';
    if (obj.styleThrough)    tel.style.textDecoration = 'through-line';
    if (obj.styleBold)    tel.style.fontWeight = 'bold';
    tel.style.overflow = 'hidden';
    tel.style.whiteSpace = 'nowrap';
    
    var ar = obj.data;
    var text = [];
    var delta = 40;
    for (var i = 0; i < ar.length; i++) {
        text[i] = '';
        if (ar[i].br) {
            text[i] += '<br />';
            continue;
        }
        
        if (inverse) {
            var r1 = ar[i].r + delta, b1 = ar[i].b + delta, g1 = ar[i].g + delta;
            if (r1 > 255)    r1 = 255;
            else if (r1 < 0)    r1 = 0;
            
            if (g1 > 255)    g1 = 255;
            else if (g1 < 0)    g1 = 0;
            
            if (b1 > 255)    b1 = 255;
            else if (b1 < 0)    b1 = 0;
            
            text[i] += '<span style="background-color:rgb(' + ar[i].r + ',' + ar[i].g + ',' + ar[i].b + '); color:rgb(' + r1 + ',' + g1 + ',' + b1 + ')">' + ar[i].l + '<\/span>';
        }
        else    text[i] += '<span style="color:rgb(' + ar[i].r + ',' + ar[i].g + ',' + ar[i].b + ')">' + ar[i].l + '<\/span>';
    }
    
    tel.innerHTML = text.join('');
    
    return true;
}