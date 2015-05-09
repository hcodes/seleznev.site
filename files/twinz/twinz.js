/* 
    © 2007 Селезнёв Д.Л., info@webfilin.ru
    Версия 0.9, 23.11.2007
    Лицензия: GNU GPL
*/
var CAGESX=6;
var CAGESY=5;
var CAGES=CAGESX*CAGESY;
var CAGES2=15;

var CAGE_SIZEX=139;
var CAGE_SIZEY=119;

var DIR_IMAGE='i/';
        
var field=[];
var fieldend=[];
        
var old_cage='';

var current_cage='';

var closes=false;

var timer=0;

var gametime=618;

var coloda_y=0;
var coloda_z=10;

var find_cage=0;

var end_game=false;


function $(id)    {return document.getElementById(id);}

function setOpacity(id, opacity)
{
    var object=$(id).style;

    object.filter='alpha(opacity='+opacity+')';
    object.opacity=(opacity/100);
}

function setOpacityE(object, opacity)
{
    object.style.filter='alpha(opacity='+opacity+')';
    object.style.opacity=(opacity/100);
}

function moveTo(id, x, y)
{
    $(id).style.left=''+x+'px';
    $(id).style.top=''+y+'px';
}

function holo()
{
    show('hinter');

    $('hinter').style.backgroundImage=$('c1').style.backgroundImage;    
    setOpacity('hinter', 100);
    
    faden=100;
    setTimeout('fadeOut()', 2000);
}

function playSound(src)
{
    $('sound').innerHTML='<embed src="'+src+'" hidden="true" type="audio/mpeg" autostart="true" loop="false"></embed>';
}
    
function fadeOut()
{
    faden-=10;
    
    if (faden<0)
    {
        hide('hinter');
        faden=0;
    }
    else
    {
        setOpacity('hinter', faden);
        setTimeout('fadeOut()', 50);
    }
}

function fadeOutId(id)
{
    fadeIdn-=10;
    if (fadeIdn<0)
    {
        hide(id);
        fadeIdn=100;
        setOpacity(id, fadeIdn);
    }
    else
    {
        setOpacity(id, fadeIdn);
        setTimeout('fadeOutId(\''+id+'\')', 30);
    }
}

function getTargetId(e)
{
    return window.event ? window.event.srcElement.id : e.currentTarget.id;
}

function getTargetTag(e)
{
    return window.event ? window.event.srcElement : e.currentTarget;
}

function initss()
{
    var img=$('skins').getElementsByTagName('img');
    var i;
    
    for (i=0; i<img.length; i++)
    {
        img[i].onmouseover=mouseoverss;
        img[i].onmouseout=mouseoutss;
        
    }
}

function startRndOpacity()
{
    stopRndOpacity=false;
    
    setOpacity('c'+(getRandom(CAGES)+1), 80+getRandom(20));
    
    setTimeout('startRndOpacity()', 500);
}

function startGameTime()
{
    if (end_game)    return;
    
    gametime--;
    
    
    $('timerhider').style.height=''+(618-gametime)+'px';
    if (gametime)    setTimeout('startGameTime()', 300);
    
    if (gametime==50)
    {
        startMigalka();
    }
    
    if (gametime<1)
    {
        end_game=true;
        setTimeout('showno()', 1000);
    }
}

function startMigalka()
{
    if (end_game)    return;
    
    if (this.ch)
    {
        this.ch=0;
        hide('timerliner');
    }
    else
    {
        this.ch=1;
        show('timerliner');
    }

    if (gametime)    setTimeout('startMigalka()', 50);
}

function generateField()
{
    for(var i=1; i<=CAGES2; i++)
    {
        field[i-1]=i;
        field[i-1+15]=i+15;
    }
    
    var a, b, c, r;
    for(var i=0; i<CAGES; i++)
    {
        r=getRandom(CAGES-1);
        b=field[i];
        a=field[r];
        field[i]=a;
        field[r]=b;
    }
    
    for(var i=0; i<CAGES; i++)
    {
        fieldend[i]=field[i];
    }
}

function mouseoutss(e)
{
    var el=getTargetTag(e);
    setOpacityE(el, 100);
}

function mouseoverss(e)
{
    var el=getTargetTag(e);
    if (el.parentNode.tagName=='P')
    {
        if (el.parentNode.className!='selected')    setOpacityE(el, 60);
    }
}

function closeCage(a, b, t)
{
    if (closes && t==timer)
    {
        $(a).src=DIR_IMAGE+'hider.gif';
        $(b).src=DIR_IMAGE+'hider.gif';
        closes=false;
    }
}


function showEnd()
{
    end_game=true;
    
    var x, y, f, c, k, i=0;
    
    for(x=0; x<5; x+=2)
    {
        k=1;
        for(y=0; y<5; y++)
        {
            while(fieldend[i]>CAGES2)    i++;
            var c=new Mover('c'+fieldend[i], (x+k)*CAGE_SIZEX, y*CAGE_SIZEY);
            c.start();
            
            i++;
            
            if (k==1)    k=0;
            else    k=1;
        }
    }

    setTimeout('showyes()', 3000);
}

function showyes()
{
    show('endyes');
    playSound('i/music/aerosmith.mp3');
    
    for(y=1; y<=CAGES; y++)
    {
        hide('c'+y);
    }
    
    hide('game');
    hide('text');
    hide('timer');
    hide('field');
    hide('subfield');
    
}

function showno()
{
    show('endno');
    playSound('i/music/holles.mp3');
    
    for(y=1; y<=CAGES; y++)
    {
        hide('c'+y);
    }
    
    hide('game');
    hide('text');
    hide('timer');
    hide('field');
    hide('subfield');    
}

function mousedown(e)
{
    return false;
}

function click(e)
{
    gametime--;
    var p=getTargetTag(e);
    current_cage=p.id;
    
    if (old_cage==p.id)    return;
    
    p.src=DIR_IMAGE+'x.gif';
    setOpacity(p.id, 100);

    //alert(tooCages(old_cage, p.id)+' '+old_cage+' '+p.id);
    
    if (closes)
    {
        for(var i=1; i<=CAGES; i++)
        {
            if ($('c'+i).onclick!=null)    $('c'+i).src=DIR_IMAGE+'hider.gif';
        }
        closes=false;
    }
    
    p.src=DIR_IMAGE+'x.gif';
        
    if (tooCages(old_cage, p.id))
    {
        $(old_cage).onclick=null;
        $(old_cage).onmouseover=null;
        $(old_cage).onmouseout=null;
        $(old_cage).style.zIndex=coloda_z;
        $(old_cage).style.cursor='default';

        $(p.id).onclick=null;
        $(p.id).onmouseover=null;
        $(p.id).onmouseout=null;
        $(p.id).style.zIndex=coloda_z;
        $(p.id).style.cursor='default';

        var rnd=getRandom(100);
        
        if (cageGt(old_cage))
        {
            var op=new Opacer(old_cage, true, true);
            op.v=3;
            op.start();
        }
        else
        {
            if (find_cage!=14)
            {
                var mov=new Mover(old_cage, 850+rnd, coloda_y, 0);
                mov.start();
            }
        }

        if (cageGt(p.id))
        {
            var op=new Opacer(p.id, true, true);
            op.v=3;
            op.start();
        }
        else
        {
            if (find_cage!=14)
            {
                var mov2=new Mover(p.id, 850+rnd, coloda_y, 0);
                mov2.start();
            }
        }
        
        setZeroField(p.id);
        setZeroField(old_cage);
        
        var x,y;
        for (var n=0; n<CAGES; n++)
        {
            y=Math.floor(n/CAGESX);
            x=n-CAGESX*y;
        
            if (field[n])
            {
                var mt=new Mover('c'+field[n], (CAGE_SIZEX+3)*x, (CAGE_SIZEY+5)*y);
                mt.start();
            }
        }        

        
        coloda_y+=50;
        coloda_z++;
        
        old_cage='';
        
        find_cage++;
        
        if (find_cage==15)    showEnd();
    }
    else
    {
        if (old_cage!='')
        {
            var nn=new MoverNot(p.id);
            nn.start();

            var nn2=new MoverNot(old_cage);
            nn2.start();
            
            timer++;
            setTimeout('closeCage(\''+p.id+'\', \''+old_cage+'\', '+timer+')', 1000);
            old_cage='';
            closes=true;
        }
        else    old_cage=p.id;
    }
    
    //refreshEvent();

    //if (isEnd())
    //{
//        end=true;
        //prepareEnd();
    //}
    
    return false;
}

function setZeroField(id)
{
    var n=parseInt(id.replace(/c/, ''));
    var p;
    for (var i=0; i<CAGES; i++)
    {
        if (field[i]==n)
        {
            //alert(n);
            field[i]=0;
            p=i;
            
            while(p>=0)
            {
                if ((p-CAGESX)<0)    field[p]=0;
                else    field[p]=field[p-CAGESX];
                p-=CAGESX;
            }
            
            break;
        }
    }
}

function tooCages(a, b)
{
    if (a=='')    return false;
    if (b=='')    return false;
    
    a=parseInt(a.replace(/c/, ''));
    b=parseInt(b.replace(/c/, ''));
    
    //alert(a);
    //alert(b);
    
    if (a>b && a-15==b)    return true;
    if (b>a && b-15==a)    return true;
    
    return false;
}

function cageGt(id)
{
    if (parseInt(id.replace(/c/, ''))>15)    return true;

    return false;
}

function prepareEnd()
{
    var n, el;
    for (n=1; n<=CAGES; n++)
    {
        el=$('c'+n);
        el.onmouseout=null;
        el.onmouseover=null;
        el.onclick=null;
        el.style.cursor='default';
        setOpacity('c'+n, 100);
    }
    
    setTimeout('showCage16()', 700);
}

function showCage16()
{
    $('c16').style.backgroundImage="url('"+DIR_IMAGE+CAGE_IMAGE+"')";
    refreshCage(16);
}

function searchCage(id)
{
    id=id.replace(/c/, '');

    var n;
    for (n=0; n<36; n++)
    {
        if (id==field[n])    return n;
    }
    
    return 0;    
}

function swapCages(a, b)
{
    var buf=field[a];
    field[a]=field[b];
    field[b]=buf;
}

function moveCages(c)
{
    var i,n, count;
    
    for (n=c; n>(c-4) && field[n]; n--)
    {
        if (field[n])
        {
            if (field[n]==16)
            {
                moveRight(c, n);
                return;
            }
        }
        else    break;
    }

    for (n=c; n<(c+4) && field[n]; n++)
    {
        if (field[n])
        {
            if (field[n]==16)
            {
                moveLeft(c, n);
                return;                
            }
        }
        else    break;
    }
        
    for (n=c; n>(c-24) && n>0 && field[n]; n=n-6)
    {
        if (field[n])
        {
            if (field[n]==16)
            {
                moveDown(c, n);
                return;
            }
        }
        else    break;
    }

    for (n=c; n<(c+24) && n<35 && field[n]; n=n+6)
    {
        if (field[n])
        {
            if (field[n]==16)
            {
                moveUp(c, n);
                return;                
            }
        }
        else    break;
    }    
}

function calcFA(id)
{
    id=id.replace(/c/, '');

    var n=Math.floor((id-1)/4);
    
    return (id-1)%4+n*6+7;
}

function calcAF(n)
{
    var i=Math.floor(n/6)-1;
    
    return 4*i+n%6;
}

function moveUp(c, n)
{
    var anim;
    var a=4;

    while(c!=n && n>0 && n<35 && field[n])
    {
        anim=new Mover(n-6, 2);
        anim.a=a;
        anim.start();
        swapCages(n, n-6);
        n=n-6;
        a--;
    }
}

function moveDown(c, n)
{
    var anim;
    
    while(c!=n && n>0 && n<35 && field[n])
    {
        anim=new Mover(n+6, 0);
        anim.start();
    
        swapCages(n, n+6);
        
        n=n+6;
    }
}

function moveLeft(c, n)
{
    var anim;
    while(c!=n && n>0 && n<35 && field[n])
    {
        anim=new Mover(n-1, 1);
        anim.start();
    
        swapCages(n, n-1);
        n--;
    }
}

function moveRight(c, n)
{
    var anim;
    
    while(c!=n && n>0 && n<35 && field[n])
    {
        anim=new Mover(n+1, 3);
        anim.start();
    
        swapCages(n, n+1);
        n++;
    }
}

function mouseout(e)
{
    setOpacity(getTargetId(e), 100);
}

//var cagemouseout=-1;
//var cagemouseover=-1;

function mouseover(e)
{
    setOpacity(getTargetId(e), 80);
}

function setOpacityCages(a)
{
    var i;
    for (i=0; i<a.length; i++)
    {
        setOpacity('c'+field[a[i]], 70);
    }
}

function isEnd()
{
    var i;

    for (i=0; i<36; i++)
    {
        if (field[i]!=fieldEnd[i])    return false;
    }
    
    return true;
}        

function startIntro2()
{
    var op=new Opacer('intro', true, true);
    op.v=5;
    op.start();
    
    setTimeout('startIntro22()', 2000);
}

function startIntro22()
{
    hide('intro');
    show('pzintro2');
    
    var n=new Mover('pzcapa', 200, 100, 0);
    n.timeout=1000;
    n.start();
    
    var n=new Mover('pzbutton', 200, 400, 0);
    n.timeout=2000;
    n.start();    
    
    var n1=new Mover('pzaddr', 800, 400, 0);
    n1.start()
    
}

function startIntro23()
{
    hide('pzintro2');
    hide('pzcapa');
    hide('pzaddr');
    hide('pzbutton');
    init();
}

        
function init()
{
    playSound('i/music/queen.mp3');
    
    var text='';
    var n=1;
    
    for (var i=1; i<=CAGES2; i++)
    {
        text+='<img style="background-image:url(\''+DIR_IMAGE+n+'.jpg\');" id="c'+n+'" src="'+DIR_IMAGE+'hider.gif" class="cage" />';
        text+='<img style="background-image:url(\''+DIR_IMAGE+n+'.jpg\');" id="c'+(n+CAGES2)+'" src="'+DIR_IMAGE+'hider.gif" class="cage" />';
            
        n++;
    }

    $('subfield').innerHTML=text;

    n=0;
    var c, o;

    generateField();
    var x,y;
    for (var n=0; n<CAGES; n++)
    {
    
        y=Math.floor(n/CAGESX);
        x=n-CAGESX*y;
        
        o=field[n];
        c=$('c'+o);
        c.onclick=click;
        c.onmouseover=mouseover;
        c.onmouseout=mouseout;
        c.onmousedown=mousedown;
        
        moveTo('c'+o, (CAGE_SIZEX+3)*x, (CAGE_SIZEY+5)*y);
    }

    startRndOpacity();
    startGameTime();
    
    show('timerliner');
    show('text');
    
    hide('intro');
}

//window.onload=init;


//-----------------------------------------------------------------------------------------------------------------------------
var _gTwinz=new Array();

function _gTwinzNextFrame(id)
{
    _gTwinz[id].nextFrame();

    return;
}

function Mover(iden, x2, y2, eff)
{
    this.idImg=iden;
    this.id=_gTwinz.length;
    _gTwinz.push(this);

    
    this.x1=parseInt($(iden).style.left.replace(/px/, ''));
    this.y1=parseInt($(iden).style.top.replace(/px/, ''));
    this.x2=x2;
    this.y2=y2;
    
    //alert($(this.idImg));
    
    this.x=this.x1;
    this.y=this.y1;
    
    return;
}

Mover.prototype.x=0;
Mover.prototype.y=0;
Mover.prototype.a=1;
Mover.prototype.v=0;
Mover.prototype.t=20;
Mover.prototype.kx=1;
Mover.prototype.ky=1;
Mover.prototype.timeout=0;

Mover.prototype.id=null;

Mover.prototype.start=function()
{
    if (this.timeout)
    {
        setTimeout('_gTwinzNextFrame('+this.id+');', this.timeout);
        this.timeout=0;
    }
    else this.nextFrame();
}

Mover.prototype.nextFrame=function()
{
    this.v=this.v+this.a;
    
    if (this.x1!=this.x2)
    {
        if (this.x1>this.x2)    this.x-=this.v;
        else    this.x+=this.v;
    }

    if (this.y1!=this.y2)
    {
        if (this.y1>this.y2)    this.y-=this.v;
        else    this.y+=this.v;
    }

    if (this.x1<this.x2 && this.x>this.x2)    this.x=this.x2;
    if (this.x2<this.x1 && this.x<this.x2)    this.x=this.x2;
    
    if (this.y1<this.y2 && this.y>this.y2)    this.y=this.y2;
    if (this.y2<this.y1 && this.y<this.y2)    this.y=this.y2;

    if (this.x==this.x2 && this.y==this.y2)
    {
        moveTo(this.idImg, this.x2, this.y2);        
    }
    else
    {
        moveTo(this.idImg, this.x, this.y);
        setTimeout('_gTwinzNextFrame('+this.id+');', this.t);
    }
    
    this.a+=0.2;
}

//----------------------------------------------------------------------------




function MoverNot(iden)
{
    this.idImg=iden;
    this.id=_gTwinz.length;
    _gTwinz.push(this);

    this.x=parseInt($(iden).style.left.replace(/px/, ''));
    this.y=parseInt($(iden).style.top.replace(/px/, ''));
    this.timer=10;//+getRandom(30);
    this.v=1;
    
    return;
}

MoverNot.prototype.x=0;
MoverNot.prototype.y=0;
MoverNot.prototype.v=5;
MoverNot.prototype.timer=20;
MoverNot.prototype.step=0;

MoverNot.prototype.id=null;

MoverNot.prototype.start=function()
{
    this.nextFrame();
}

MoverNot.prototype.nextFrame=function()
{
    if (this.step<5)
    {
        this.x-=this.v;
    }
    
    if (this.step>=5 && this.step<15)
    {
        this.x+=this.v;
    }

    if (this.step>=15 && this.step<20)
    {
        this.x-=this.v;
    }

    if (this.step<20)
    {
        moveTo(this.idImg, this.x, this.y);
        setTimeout('_gTwinzNextFrame('+this.id+');', this.timer);
    }
    
    this.step++;
}



//---------------------------------------------------------------------------
var _gOpacer=new Array();

function _gOpacerNextFrame(id)
{
    _gOpacer[id].nextFrame();

    return;
}

function Opacer(iden, side, off)
{
    this.idImg=iden;
    this.id=_gOpacer.length;
    _gOpacer.push(this);

    this.side=side;
    this.off=off;

    
    if (this.side)    this.opacity=100;
    
    return;
}

Opacer.prototype.id=null;
Opacer.prototype.timer=10;
Opacer.prototype.opacity=0;
Opacer.prototype.v=1;

Opacer.prototype.start=function()
{
    this.nextFrame();
}

Opacer.prototype.nextFrame=function()
{
    if (this.side)    this.opacity-=this.v;
    else    this.opacity+=this.v;
    
    if (this.opacity>100)    this.opacity=100;
    if (this.opacity<0)    this.opacity=0;
    
    setOpacity(this.idImg, this.opacity);
    
    if ((this.side && this.opacity==0) || (!this.side && this.opacity==100))
    {
        this.id=null;
        if (this.off)    hide(this.idImg);
        
        return;
    }
    else    setTimeout('_gOpacerNextFrame('+this.id+');', this.timer);
}



//------------------------------------------------

function showUrlImage()
{
    show('selectImage');
    hide('menuDownloadImage');
    $('urlImage').focus();
}

function downloadImage()
{
    var url=$('urlImage').value;
    
    if (url=='' || url=='http://')
    {
        alert('Не указан адрес картинки.');
        $('urlImage').focus();
        
        return;
    }
    
    if (preloadImage(url))
    {
        selectHTTPImage(url);

        var n, find=false;
        for (n=0; n<cookieArray.length; n++)
        {
            if (cookieArray[n]==url)
            {
                find=true;
                cookieArray[n]='';
                break;
            }
        }
        cookieArray.push(url);
        
        showCookie();
    }
    
    hide('selectImage');
    show('menuDownloadImage');
}

function submitForm(e)
{
    e=(e) ? e : event;
    var charCode=(e.charCode) ? e.charCode : ((e.which) ? e.which : e.keyCode);
    if (charCode==13)    downloadImage();
}

function showCookie()
{
    var i, str='';
    for (i=cookieArray.length-1; i>=0; i--)
    {
        if (cookieArray=='')    continue;
        str+='<p><span class="inter" onclick="javascript:selectHTTPImage(\''+cookieArray[i]+'\')">'+cookieArray[i]+'</span></p>';
    }
    
    if (str!='')
    {
        str+='<div class="deleteAll"><span class="inter" onclick="javascript:deleteAllDownload();">Удалить всё</span></div>';
    }
    
    $('mycookie').innerHTML=str;
    
    if (str=='')    hide('mycookie');
    else    show('mycookie');
    
    for (i=0; i<cookieN; i++)
    {
        deleteCookie('img'+i);
    }
    
    var n=cookieN-1;
    for (i=cookieArray.length-1; i>=0 && n>=0; i--)
    {
        if (cookieArray[i]=='')    continue;
        else
        {
            setCookie('img'+n, cookieArray[i], getExpDate(30, 0, 0));
            n--;
        }
    }
}

function deleteAllDownload()
{
    var i;
    for (i=0; i<cookieN; i++)
    {
        deleteCookie('img'+i);
    }
    
    cookieArray=[];
    
    showCookie();
}

function getRandom(n)
{
    return Math.floor(Math.random()*n);

}

function show(id)
{
    $(id).style.display='block';
}

function hide(id)
{
    $(id).style.display='none';
}


function preloadImage(file)
{
    errimage=false;
    var img=new Image();
    img.onerror=function(){errimage=true;}
    img.src=file;
/*    if (!img.width || errimage)
    {
        alert('Не могу загрузить картинку.');
        return false;
    }
*/    
    return true;
}


//--- Работа с куки
function getExpDate(days, hours, minutes)
{
    var expDate=new Date();
    
    if (typeof days=="number" && typeof hours=="number" && typeof hours=="number")
    {
        expDate.setDate(expDate.getDate()+parseInt(days));
        expDate.setHours(expDate.getHours()+parseInt(hours));
        expDate.setMinutes(expDate.getMinutes()+parseInt(minutes));
        
        return expDate.toGMTString();
    }
    
    return null;
}

function getCookieVal(offset)
{
    var endstr=document.cookie.indexOf (";", offset);
    if (endstr==-1)    endstr=document.cookie.length;
    
    return unescape(document.cookie.substring(offset, endstr));
}

function getCookie(name)
{
    var arg=name+"=";
    var alen=arg.length;
    var clen=document.cookie.length;
    var i=0;
    
    while (i<clen)
    {
        var j=i+alen;
        if (document.cookie.substring(i, j)==arg)    return getCookieVal(j);
        i=document.cookie.indexOf(" ", i)+1;
        if (i==0) break; 
    }
    
    return null;
}

function setCookie(name, value, expires, path, domain, secure)
{
    document.cookie=name+"="+escape(value)+
        ((expires) ? "; expires="+expires : "")+
        ((path) ? "; path="+path : "")+
        ((domain) ? "; domain="+domain : "")+
        ((secure) ? "; secure" : "");
}

function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {
        document.cookie=name+"="+
            ((path) ? "; path="+path : "")+
            ((domain) ? "; domain="+domain : "")+
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}