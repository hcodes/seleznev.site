$(window).load(function() {
                        
    $('#button')[0].disabled = false;
    
    var width = 640;
    var height = 800;
    var timer = 2000;

    var side1 = true;
    var side2 = true;
    var side3 = true;
    var side4 = true;

    var text1 = '';
    var text2 = '';
    for (var i = 0; i < width / 2; i++)    text1 += '<div></div>';
    for (var i = 0; i < height / 2; i++)    text2 += '<div></div>';
    
    $('#cage1').html(text1);
    $('#cage2').html(text2);
    
    $('#cage1 div').each(function(i) {
        var delim = 40;
        var n = Math.floor(i / delim);
        var p = i % delim;
        var z = 1;
        if (n % 2) {
            z = 2;
        }
        
        this.style.backgroundPosition = '-' + (n * delim * 2 + p) + 'px 0px';
        this.style.left = (n * delim * 2 + p) + 'px';
        
        this.style.zIndex = z;
    });

    $('#cage2 div').each(function(i) {
        var delim = 40;
        var n = Math.floor(i / delim);
        var p = i % delim;
        var z = 1;
        if (n % 2) {
            z = 2;
        }    
        this.style.backgroundPosition = '0px -' + (n * delim * 2 + p) + 'px';
        this.style.top = (n * delim * 2 + p) + 'px';
        this.style.zIndex = z;
    });


    $('#button').click(function() {
        $('#button').unbind('click');
        $('#button')[0].disabled = true;
        cageMove();
    });    

});


var step = 10;

function cageMove() {
    step += 10;
    
    $('#many2 #cage1 div').each(function(i) {
        this.style.top = (Math.cos(2 * Math.PI * (i + step) / 1000) * 100) + 'px';
    });

    $('#many2 #cage2 div').each(function(i) {
        this.style.left = (Math.cos(2 * Math.PI * (i + step) / 1000) * 100) + 'px';
    });

    setTimeout(cageMove, 50);    
}

function getRandom(n) {
    return Math.floor(Math.random()*n);
}