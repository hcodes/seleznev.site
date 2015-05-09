window.onload=function()
{
    var text=$('text').innerHTML;
    var text2='';

    for(var n=0; n<text.length; n++)    text2+='<span>'+text.charAt(n)+'<\/span>';

    $('show').innerHTML=text2;

    spans=$('show').getElementsByTagName('span');
    for (var i=0; i<spans.length; i++)    ax[i]=getLeft(spans[i]);

    $('show').className='a';
    $('start').onclick=function()
    {
        player();
        $('start').style.display='none';
    }
}

var ax=[];
var spans=[];

var div=1;
var step=div;

var count=0;
var ar=mousedata;

var stepEnd=0.05;

var kx=0;
var ky=0;

function player()
{
    step++;
    
    var nnn=parseInt(step/div);
    var check=false;
    var s;
    
    for (var i=0; i<nnn; i++)
    {
        s=step-div*i;
        
        if (s<0 || s>=ar[0].length || i>=spans.length)    continue;
        spans[i].style.left=ar[0][s]+'px';
        spans[i].style.top=ar[1][s]+'px';
        check=true;
    }
    
    if (!check)
    {
        playerEnd();
        return;
    }
    
    setTimeout('player();', 50);
}

function playerEnd()
{
    var xend=mousedata[0][mousedata[0].length-1];
    var yend=mousedata[1][mousedata[1].length-1];
    for (var i=0; i<spans.length; i++)
    {
        spans[i].style.left=xend+Math.floor(ax[i]*kx)+'px';
        spans[i].style.top=Math.floor(yend+ky*20)+'px';
    }
    
    kx+=stepEnd;
    if (kx>5)    ky-=stepEnd;
    else ky+=stepEnd;
    
    if (kx>1)    return;
    
    setTimeout('playerEnd();', 50);
}


//--- lib ---
function $(id)
{
    return document.getElementById(id);
}
    
function getLeft(id)
{
    var el=id;
    if (typeof id=='string')    el=$(id);

    var il=0;

    while(el.tagName!='BODY' && el.tagName!='HTML')
    {
        il+=el.offsetLeft;
        el=el.offsetParent;
    }
    il+=el.offsetLeft;

    return il;
}