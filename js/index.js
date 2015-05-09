function $$(id) {
    return document.getElementById(id);
}

window.onload = function() {
/*    $$('a15').onmouseover = $$('img15').onmouseover = function() {
        $$('img15').src = '/gfx/main/15_hover.jpg';
    }

    $$('a15').onmouseout = $$('img15').onmouseout = function() {
        $$('img15').src = '/gfx/main/15.jpg';
    }
    
    $$('aTwinz').onmouseover = $$('imgTwinz').onmouseover = function() {
        $$('imgTwinz').src = '/gfx/main/twinz_hover.gif';
    }

    $$('aTwinz').onmouseout = $$('imgTwinz').onmouseout = function() {
        $$('imgTwinz').src = '/gfx/main/twinz.gif';
    }
*/
    var li = document.getElementsByTagName('li', $$('work-table'));
    for (var i = 0; i < li.length; i++) {
        li[i].style.left = (- Math.sin(i / 4) * 30) + 'px';
    }
    
    /*var angle = 0;
    var isMove = false;
    
    function GOOO() {
        if (isMove) {
            angle += 5;
            $$('firefox-rotator').style['MozTransform'] = $$('firefox-rotator').style['WebkitTransform'] = 'rotate(' + angle + 'deg)';
            setTimeout(GOOO, 30)
        }
    }
    
    if ($$('firefox-rotator')) {
        $$('firefox-rotator').onmouseout = function() {
            $$('firefox-rotator')
            angle = 0;
            isMove = false;
        }
        
        $$('firefox-rotator').onmouseover = function() {
            isMove = true;
            setTimeout(GOOO, 30);
        }
    }*/
    
    
    var nhellip = 0;
    
    function helliper() {
        for (var i = 1; i <= ('...').length; i++) {
            if (i <= nhellip)    $$('wait' + i).style.visibility = 'visible';
            else    $$('wait' + i).style.visibility = 'hidden';
        }
        
        nhellip++;
        if (nhellip > ('...').length) nhellip = 0;
        setTimeout(helliper, 500);
    }
    
    //helliper();
}