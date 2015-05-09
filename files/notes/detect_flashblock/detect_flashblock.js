function detectFlashBlock(callback, callbackNotBlock, callbackNotFound) {
    if (!$.browser.mozilla) {
        return false;
    }
    
    var count = 0,
        commonCSS = 'margin:0 !important; padding:0 !important; border:0 !important;',
        test = $('<div style="position:absolute !important; left:-9999px !important; top:-9999px !important; ' + commonCSS + '"><embed src="about:blank" style="width:1px !important; height:1px !important; ' + commonCSS + '" width="1" height="1" quality="high" wmode="transparent" bgcolor="#ffffff" type="application/x-shockwave-flash"></embed></div>');
        
    $('body').append(test);
    
    function checkFlashBlock() {
        if (!test.find('embed').length) {
            if (typeof callback != 'undefined') {
                callback();
            }
        }
        else if (count < 7) {
            count++;
            setTimeout(checkFlashBlock, 200);
        }
        else {
            if (typeof callbackNotBlock != 'undefined') {
                callbackNotBlock();
            }
        }
    }        
  
    var fbImage = new Image(1, 1);
    fbImage.onload = function() {
        $(window).load(checkFlashBlock);
    };
    
    fbImage.onerror = function() {
        if (typeof callbackNotFound != 'undefined') {
            callbackNotFound();
        }
    };
    
    fbImage.src = 'chrome://flashblock/skin/flash-on-24.png';
    return;
}