// © 2008 Denis Seleznev, info@webfilin.ru, www.webfilin.ru
// Viewer text photo v1.0

function textPhoto(id, obj)
{
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
    
    var ar = obj.data;
    var text = '';
    var buf = [];
    for (var i = 0; i < ar.length; i++) {
        text = '<div style="position:absolute; -webkit-transform:rotate(' + ar[i].a + 'deg); -moz-transform:rotate(' + ar[i].a + 'deg); font-size:' + ar[i].f + 'px; left:' + ar[i].x + 'px; top:' + ar[i].y + 'px; color:rgb(' + ar[i].r + ',' + ar[i].g + ',' + ar[i].b + ')">' + ar[i].l + '</div>';
        buf.push(text);
    }
    
    tel.innerHTML = buf.join('');
    
    return true;
}