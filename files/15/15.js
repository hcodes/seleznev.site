/* 
    15
    © 2007 Селезнёв Д.Л., info@webfilin.ru
    Версия 0.9, 23.11.2007
    
    Только для сайта http://webfilin.ru
*/

var CAGES=16;
var CAGE_SIZE=150;
var CAGE_IMAGE='main.jpg';
var DIR_IMAGE='i/skins/';
var DIR_DEFAULT_IMAGE=DIR_IMAGE;
var lastId=0;
var end=false;
var faden=100;
var fadeIdn=100;
var errimage=false;

var cookieArray=[];
var cookieN=5;

/*var field=[0,0,0,0,0,0,
        0,1,2,3,4,0,
        0,5,6,7,8,0,
        0,9,10,16,11,0,
        0,13,14,15,12,0,
        0,0,0,0,0,0];*/
        
var field=[];
        
var fieldEnd=[0,0,0,0,0,0,
        0,1,2,3,4,0,
        0,5,6,7,8,0,
        0,9,10,11,12,0,
        0,13,14,15,16,0,
        0,0,0,0,0,0];
        
var fields=[[0,0,0,0,0,0,0,9,8,11,16,0,0,2,4,3,12,0,0,13,5,1,7,0,0,14,6,10,15,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,9,4,11,12,0,0,2,5,8,7,0,0,13,1,3,15,0,0,14,6,16,10,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,1,2,4,0,0,6,10,3,8,0,0,9,14,7,11,0,0,13,15,12,16,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,10,1,4,0,0,14,16,2,8,0,0,6,15,3,11,0,0,9,13,7,12,0,0,0,0,0,0,0],    
    [0,0,0,0,0,0,0,9,2,10,3,0,0,13,1,7,16,0,0,5,6,8,4,0,0,15,14,11,12,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,2,3,8,0,0,16,7,4,11,0,0,9,6,1,12,0,0,13,14,10,15,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,8,1,9,0,0,13,7,2,3,0,0,4,14,15,11,0,0,16,6,12,10,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,10,3,5,8,0,0,6,14,4,12,0,0,2,16,11,15,0,0,1,7,9,13,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,7,16,3,0,0,2,1,10,4,0,0,9,13,6,12,0,0,14,15,11,8,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,6,3,8,0,0,1,4,5,11,0,0,13,14,16,12,0,0,9,7,10,15,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,5,2,14,10,0,0,4,3,6,11,0,0,13,1,8,7,0,0,16,9,15,12,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,7,2,4,8,0,0,5,16,1,11,0,0,13,6,10,12,0,0,9,15,3,14,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,7,4,3,8,0,0,9,15,11,16,0,0,2,1,10,12,0,0,13,6,14,5,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,10,7,8,12,0,0,9,15,16,5,0,0,4,11,3,6,0,0,2,1,13,14,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,9,10,8,12,0,0,4,7,5,6,0,0,2,15,16,3,0,0,11,1,13,14,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,8,15,12,3,0,0,10,6,14,1,0,0,9,7,13,11,0,0,2,5,16,4,0,0,0,0,0,0,0]
];

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
    $(id).style.left=''+(x+CAGE_SIZE)+'px';
    $(id).style.top=''+(y+CAGE_SIZE)+'px';
}

function holo()
{
    showd('hinter');

    $('hinter').style.backgroundImage=$('c1').style.backgroundImage;    
    setOpacity('hinter', 100);
    
    faden=100;
    setTimeout('fadeOut()', 2000);
}
    
function fadeOut()
{
    faden-=10;
    
    if (faden<0)
    {
        hided('hinter');
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
        hided(id);
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

function click(e)
{
    if (end)    return;
    moveCages(searchCage(getTargetId(e)));
    refreshEvent();

    if (isEnd())
    {
        end=true;
        prepareEnd();
    }
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
    var n;
    for (n=1; n<=16; n++)
    {
        setOpacity('c'+n, 100);
    }
}

function mouseover(e)
{
    var id=searchCage(getTargetId(e));
    var cageu=[];
    var caged=[];
    var cager=[];
    var cagel=[];
    var u, d, l, r;
    var nu, nd, nl, nr;
    nu=nd=nl=nr=true;
    
    u=d=l=r=id;
    var find=false;
    
    var i;
    for (i=0; i<4; i++)
    {
        if (field[l])
        {
            if (field[l]!=16)
            {
                cagel.push(l);
            }
            else
            {
                setOpacityCages(cagel);
                return;
            }
            l--;
        }

        if (field[r])
        {
            if (field[r]!=16)
            {
                if (field[r])    cager.push(r);
            }
            else
            {
                setOpacityCages(cager);
                return;
            }
            r++;
        }
        
        
        if (u>0)
        {
            if (field[u])
            {
                if (field[u]!=16)
                {
                    if (field[u])    cageu.push(u);
                }
                else
                {
                    setOpacityCages(cageu);
                    return;
                }
                u=u-6;
            }
        }
        
        if (d<35)
        {
            if (field[d])
            {
                if (field[d]!=16)
                {
                    if (field[d])    caged.push(d);
                }
                else
                {
                    setOpacityCages(caged);
                    return;
                }
                d=d+6;
            }
        }
    }
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
        
function init()
{
    getRandom();
    var i;

    for (i=1; i<=CAGES; i++)
    {
        $('c'+i).onclick=click;
        $('c'+i).onmouseover=mouseover;
        $('c'+i).onmouseout=mouseout;
    }

    var f=getRandom(fields.length);
    for (i=0; i<36; i++)
    {
        field[i]=fields[f][i];
    }
    
    $('urlImage').onkeydown=submitForm;
    
    refreshScreen();    
    refreshEvent();
    
    initss();
    
    initLocation();
    initCookie();
}

var ihelp15=0;
function help15()
{
    showd('help15');
    fadeIdn=100;
    $('help15').style.zIndex=10000;
    $('menuHelp15').className='';
    document.body.onclick=closeHelp15;
    
    return false;
}

function initCookie()
{
    var i, co;
    for (i=0; i<cookieN; i++)
    {
        co=getCookie('img'+i);
        if (co!=null)    cookieArray.push(co);
    }
    
    showCookie();
}

function initLocation()
{
    var re=/^.*\?image=/gi;
    
    if (re.test(location))
    {
        var img=location.toString().replace(re, '');
        if (img!='')    selectHTTPImage(img);
    }
}

function newGame()
{
    hide('selectImage');
    show('menuDownloadImage');    
    
    var f=getRandom(fields.length);
    for (i=0; i<36; i++)
    {
        field[i]=fields[f][i];
    }
    
    refreshEvent();
    
    refreshScreen();
}

function refreshScreen()
{
    var i, x, y;

    for (i=0; i<36; i++)
    {
        if (field[i]!=0)
        {
            y=Math.floor(i/6)-2;
            x=i%6-2;
            moveTo('c'+field[i], x*CAGE_SIZE, y*CAGE_SIZE);
        }
    }
}

function refreshCage(cage)
{
    var i, x, y;
    for (i=0; i<36; i++)
    {
        if (field[i]==cage)
        {
            y=Math.floor(i/6)-2;
            x=i%6-2;
            moveTo('c'+field[i], x*CAGE_SIZE, y*CAGE_SIZE);
        }
    }
}

function refreshEvent()
{
    var i, n;
    
    for (i=0; i<36; i++)
    {
        if (field[i]!=0)
        {
            $('c'+field[i]).style.cursor='default';
        }
    }

    for (i=0; i<36; i++)
    {
        if (field[i]==16)
        {
            for (n=i; n>(i-4) && field[n]; n--)
            {
                if (field[n])
                {
                    if (field[n]!=16)
                    {
                        $('c'+field[n]).style.cursor='hand';
                        $('c'+field[n]).style.cursor='pointer';
                    }
                }
                else    break;
            }

            for (n=i; n<(i+4) && field[n]; n++)
            {
                if (field[n])
                {
                    if (field[n]!=16)
                    {
                        $('c'+field[n]).style.cursor='hand';
                        $('c'+field[n]).style.cursor='pointer';
                    }
                }
                else    break;
            }
            
            for (n=i; n>(i-24) && n>0 && field[n]; n=n-6)
            {
                if (field[n])
                {
                    if (field[n]!=16)
                    {
                        $('c'+field[n]).style.cursor='hand';
                        $('c'+field[n]).style.cursor='pointer';
                    }
                }
                else    break;
            }

            for (n=i; n<(i+24) && n<35 && field[n]; n=n+6)
            {
                if (field[n])
                {
                    if (field[n]!=16)
                    {
                        $('c'+field[n]).style.cursor='hand';
                        $('c'+field[n]).style.cursor='pointer';
                    }
                }
                else    break;
            }
        }
    }
}

function selectImage(img, num)
{
    CAGE_IMAGE=img;
    DIR_IMAGE=DIR_DEFAULT_IMAGE;
    
    var i;
    for (i=1; i<CAGES; i++)
    {
        $('c'+i).style.backgroundImage='url('+DIR_IMAGE+img+')';
        
    }    
    
    if (end)
    {
        $('c16').style.backgroundImage='url('+DIR_IMAGE+img+')';
    }
    
    var n=1;
    while($('s'+n))
    {
        if (n==num)
        {
            $('s'+n).className='selected';
        }
        else
        {
            $('s'+n).className='noselected';
        }
        n++;
    }
}

function closeHelp15(e)
{
    if (ihelp15)
    {
        //hided('help15');
        $('menuHelp15').className='inter';
        document.body.onclick=null;
        ihelp15=0;
        fadeOutId('help15');
        
    }
    else
    {
        ihelp15++;
    }
}

function selectHTTPImage(img)
{
    CAGE_IMAGE=img;
    DIR_IMAGE='';
    var i;
    for (i=1; i<CAGES; i++)
    {
        $('c'+i).style.backgroundImage='url('+img+')';
        
    }    
    
    if (end)
    {
        $('c16').style.backgroundImage='url('+img+')';
    }
    
    var n=1;
    while($('s'+n))
    {
        $('s'+n).className='noselected';
        n++;
    }    
}

window.onload=init;


//-----------------------------------------------------------------------------------------------------------------------------
var _g15=[];
var _g15len=0;

function _gstart()
{
    if (_g15len<1)
    {
        _g15len=0;
        _g15=[];
    }
    _g15len++;
}

function _gend()
{
    _g15len--;

    if (_g15len<1)
    {
        _g15len=0;
        _g15=[];
    }
}

function _g15NextFrame(id)
{
    _g15[id].nextFrame();

    return;
}

function Mover(c, dir)
{
    _gstart();
    
    this.idImg='c'+field[c];
    this.dir=dir;
    this.id=_g15.length;
    _g15.push(this);


    this.xstart=(c%6-2)*CAGE_SIZE;
    this.ystart=(Math.floor(c/6)-2)*CAGE_SIZE;
    
    if (dir==0) // up
    {
        this.xend=this.xstart;
        this.kx=0;
        
        this.yend=this.ystart-CAGE_SIZE;
        this.ky=-1;
    }

    if (dir==1) // right
    {
        this.xend=this.xstart+CAGE_SIZE;
        this.kx=1;
        
        this.yend=this.ystart;
        this.ky=0;
    }

    if (dir==2) // down
    {
        this.xend=this.xstart;
        this.kx=0;
        
        this.yend=this.ystart+CAGE_SIZE;
        this.ky=1;
    }

    if (dir==3) // left
    {
        this.xend=this.xstart-CAGE_SIZE;
        this.kx=-1;
        
        this.yend=this.ystart;
        this.ky=0;
    }
    
    this.x=this.xstart;
    this.y=this.ystart;
    this.ch=0;
    
    return;
}

Mover.prototype.x=0;
Mover.prototype.y=0;
Mover.prototype.a=4;
Mover.prototype.v=0;
Mover.prototype.t=20;
Mover.prototype.kx=1;
Mover.prototype.ky=1;

Mover.prototype.id=null;

Mover.prototype.start=function()
{
    this.nextFrame();
}

Mover.prototype.nextFrame=function()
{

    if (this.xstart!=this.xend)
    {
        this.ch=this.ch+this.v*this.kx;
        this.x=Math.floor(this.x+this.v*this.kx);
    }
    
    if (this.ystart!=this.yend)
    {
        this.ch=this.ch+this.v*this.ky;
        this.y=Math.floor(this.y+this.v*this.ky);
    }
    
    this.v=this.v+this.a;
    if (Math.abs(this.ch)<CAGE_SIZE)
    {
        moveTo(this.idImg, this.x, this.y);
        setTimeout('_g15NextFrame('+this.id+');', this.t);
    }
    else
    {
        moveTo(this.idImg, this.xend, this.yend);
        _gend();
    }
}

//----------------------------------------------------------------------------

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
    
    if (str=='')    hided('mycookie');
    else    showd('mycookie');
    
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
    $(id).style.visibility='visible';
}

function showd(id)
{
    $(id).style.display='block';
}

function hide(id)
{
    $(id).style.visibility='hidden';
}

function hided(id)
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