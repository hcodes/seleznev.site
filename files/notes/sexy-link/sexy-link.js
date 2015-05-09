var flag=true;
var timer=1300;

$(window).load(function()
{
    var sextext=$('#sexy-link').html();
    var text='';
    for(var i=0; i<sextext.length; i++)    text+='<span>'+sextext.charAt(i)+'<\/span>';
    $('#sexy-link').html(text);

    $('#switcher').click(function() {
    
        var els=$('#sexy-link span');

        if (flag)
        {
            $('#tryapka').animate({top:'481px', height:'50px'}, timer, 'linear', function() {
                for(var i=0; i<els.length; i++)    $(els[i]).animate({top:(-i*i*0.25)+'px'}, timer);
            });

            flag=!flag;
        }
        else
        {
            $('#tryapka').animate({top:'0px', height:'530px'}, timer, 'linear', function() {
                for(var i=0; i<els.length; i++)    $(els[i]).animate({top:'0px'}, timer);
            });

            flag=!flag;
        }
    });
});