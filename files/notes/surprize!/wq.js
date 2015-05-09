var isLoaded=false;

$(document).ready(function() {
    var text='';
    var orgText=$('#oj').html();
    for (var n=0; n<orgText.length; n++)    text+='<span>'+orgText.charAt(n)+'</span>';
    $('#oj').html(text);

    /*$('#oj span').each(function() {
        $(this).css('top', ''+getRandom(50)-25+'px');
    });*/
    showLoader();
});

$(window).load(function()
{
    isLoaded=true;
    $('#loader').hide();
    $('#oj').show();
    f=1;
    
    /*$('#vkl span').mouseover(function()
    {
        var spans=$('#oj span');
        var middle=Math.floor(spans.length/2);
        
        var n=0;
        var r;
        for (var i=middle; i>=0; i--)
        {
            r=Math.floor(n*n/6);
            $(spans[i]).animate({top:'-'+r+'px'}, 150);
            n++;
        }
        
        n=0;
        for (i=middle; i<spans.length; i++)
        {
            r=Math.floor(n*n/6);
            $(spans[i]).animate({top:'-'+r+'px'}, 150);
            n++;
        }
    }).mouseout(function()
    {
        var spans=$('#oj span');
        var middle=Math.floor(spans.length/2);
        
        n=0;
        var r;
        for (i=0; i<spans.length; i++)
        {
            r=Math.floor(n*n/6);
            $(spans[i]).animate({top:'0'}, 150);
            n++;
        }
    });*/
    
    $('#vkl span').click(function() {
        $('#lf1').show();
        $('#hint1').show();
        $('#lamps').show();
        $('#shadow40').show();
        $('#l1').unbind('click');
        $('#l1').addClass('inside-selected').removeClass('inside');
        $('#shadow').hide();
        $('#oj').fadeOut();
        $('#vkl').animate({opacity:0, top:'300px'}, 500);
    });
    
    $('#l2').click(function() {
        f++;
        $(this).unbind('click');
        $('#hint2').show();
        $('#hint1').hide();
        $('#lf1').hide();
        $('#lf2').show();
        $('#lamps span').removeClass('inside-selected');
        $(this).addClass('inside-selected').removeClass('inside');    
        $('#shadow60').show();
        $('#shadow40').hide();
        $('#l1').css('visibility', 'hidden');
        $('#l3').css('visibility', 'visible');
    });
    
    $('#l3').click(function() {
        f++;
        $(this).unbind('click');
        $('#hint3').show();
        $('#hint2').hide();
        $('#lf2').hide();
        $('#lf3').show();
        $('#lamps span').removeClass('inside-selected');
        $(this).addClass('inside-selected').removeClass('inside');    
        $('#shadow75').show();
        $('#shadow60').hide();
        $('#l2').css('visibility', 'hidden');
        $('#l4').css('visibility', 'visible');        
    });

    $('#l4').click(function() {
        f++;
        $(this).unbind('click');
        $('#hint4').show();
        $('#hint3').hide();
        $('#lf3').hide();
        $('#lf4').show();
        $('#lamps span').removeClass('inside-selected');
        $(this).addClass('inside-selected').removeClass('inside');    
        $('#shadow100').show();
        $('#shadow75').hide();
        $('#l3').css('visibility', 'hidden');
        $('#l5').css('visibility', 'visible');
    });

    $('#l5').click(function() {
        f++;
        $('#hint4').hide();
        $(this).unbind('click');
        $('#lf4').hide();
        $('#lamps span').removeClass('inside-selected');
        $(this).addClass('inside-selected').removeClass('inside');    
        $('#shadow0').show();
        $('#shadow100').hide();
        $('#l4').css('visibility', 'hidden');
        //$('#l5').fadeOut('slow');
    });
    
    showLetter();
    fire();
    opacityWoman();
});

var step=0;
var f=1;

function fire()
{
    $('#lf'+f).css('color', 'rgb(255,'+(225+getRandom(30))+','+(128+getRandom(30))+')')
    $('#lf'+f+' span.volos').css('color', 'rgb('+(205+getRandom(50))+',0,0)')
    setTimeout(fire, 100);
}
 
function opacityWoman()
{
    if (f<5)
    {
        $('#w').css('opacity', ((70+getRandom(30))/100));
        setTimeout(opacityWoman, 100);    
    }
    else
    {
        $('#w').css('opacity', 1);
    }
}

function showLoader()
{
    if (!isLoaded)
    {
        $('#loader').css('color', 'rgb(255,255,'+(205+getRandom(50))+')');
        setTimeout(showLoader, 50);
    }
}

function showLetter()
{
    var spans=$('#oj span');
    
    if (step<spans.length)
    {
        $(spans[step]).css('visibility', 'visible').animate({top:0}, 80);
        setTimeout(showLetter, 50);
        step++;
    }
    else
    {
        $('#vkl').show();
    }
}

function getRandom(n)
{
    return Math.floor(Math.random()*n);
}