// © 2008 Denis Seleznev, info@webfilin.ru, www.webfilin.ru
// Viewer text photo v1.0

function textPhoto(id, obj, inverse)
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
    
    tel.style.width = obj.width + 'px';
    tel.style.height = obj.height + 'px';
    tel.style.backgroundColor = obj.backgroundColor;
    tel.style.fontSize = obj.fontSize + 'px';
    tel.style.lineHeight = obj.lineHeight + 'px';
    tel.style.fontFamily = obj.fontFamily;

    if (inverse)    tel.style.backgroundColor = obj.data.backgroundColor;
    
    tel.style.overflow = 'hidden';
    tel.style.whiteSpace = 'nowrap';
    
    var ar = obj.data;
    var text = '';
    var buf = [];
    for (var i = 0; i < ar.length; i++)
    {
        if (ar[i].br)
        {
            buf.push('<br />');
            continue;
        }
        
        if (inverse)    text = '<span style="background-color:rgb(' + ar[i].r + ',' + ar[i].g + ',' + ar[i].b + ')">' + ar[i].l + '</span>';
        else    text = '<span style="color:rgb(' + ar[i].r + ',' + ar[i].g + ',' + ar[i].b + ')">' + ar[i].l + '</span>';
        
        buf.push(text);
    }
    
    tel.innerHTML = buf.join('');
    
    return true;
}