/* 
    SIP
    © 05.02.2008 Селезнёв Д. Л., info@webfilin.ru
    Лицензия: GNU GPL
*/

var sipImgWidth=260;
var sipImgHeight=195;

var sipImgSmallWidth=200;
var sipImgSmallHeight=150;

var sipImgDeltaX=50;
var sipActive=4;

var sipImgDir='';
var sipImages=['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'];

function Sip()
{
    Sip.sipac=sipActive;
    Sip.sipoldac=null;
    
    if (!$('sip'))    return false;

    function sipInit()
    {
        var c=$('sip');
        for (var i=0; i<sipImages.length; i++)
        {
            var el=document.createElement('img');
            el.id='sip'+i;
            el.src=sipImgDir+sipImages[i];
            c.appendChild(el);
            addHandler(el, 'mouseover', sipMouseover);
        }
    }
    
    function sipMouseover(e)
    {
        var id=parseInt(getTargetId(e).replace(/sip/, ''));
        sipAction(id);
    }
    
    function sipAction(id)
    {
        if (id==Sip.sipac)    return;
        if ($('sip'+id).sipstop==1)    return;

        Sip.rebuild();
        
        Sip.sipoldac=Sip.sipac;
        Sip.sipac=id;
        
        var x=getCSSLeft('sip'+Sip.sipac);

        var x1, x2, x12;
        
        if (Sip.sipac>Sip.sipoldac)
        {
            x1=x+parseInt(sipImgWidth/2.5);
            x2=x-sipImgWidth+sipImgSmallWidth;
        }
        else
        {
            x1=x-parseInt(sipImgWidth/2.8)-sipImgWidth+sipImgSmallWidth;
            x2=x;
            x12=getCSSLeft('sip'+Sip.sipoldac)+sipImgWidth-sipImgSmallWidth;
        }
        
        var y=Math.floor(-(sipImgHeight-sipImgSmallHeight)/2);
        
        var p=new MoverSizerSpec('sip'+Sip.sipac, x1, y, sipImgWidth, sipImgHeight, x2, y, 'sip'+Sip.sipoldac);
        p.sip=Sip.sipac;
        p.a=4;
        p.zIndex=100;
        p.go();        
        
        var p2=new MoverSizer('sip'+Sip.sipoldac, x12, 0, sipImgSmallWidth, sipImgSmallHeight);
        p2.a=1;
        p2.sip=Sip.sipoldac;
        p2.go();
        
        Sip.isRebuild=false;
    }
    
    Sip.catchWheel=function(e)
    {
        var ua=window.navigator.userAgent.toLowerCase();

        var isk=false;
        if (ua.indexOf('safari') != -1 || ua.indexOf('khtml') != -1)    isk=true;

        var target=window, event=(document.all || window.opera || isk) ? (target=document, 'mousewheel') : 'DOMMouseScroll';
        (e.type==='mouseover') ? addHandler(target, event, Sip.getWheelTurn) : removeHandler(target, event, Sip.getWheelTurn);
    }

    Sip.getWheelTurn=function(e)
    {
        var delta;
        var ac=Sip.sipac;
        
        if (e.detail)    delta=e.detail/3;
        else if (e.wheelDelta)    delta=e.wheelDelta/120;
        
        if (delta)
        {
            ac+=delta;
            if (ac<0)    ac=0;
            if (ac>=sipImages.length)    ac=sipImages.length-1;
            
            sipAction(ac);
        }
        
        return (e.preventDefault) ? e.preventDefault() : e.returnValue=false;
    }    

    Sip.rebuild=function()
    {
        if (Sip.isRebuild)    return false;
        else    Sip.isRebuild=true;
        
        var f=false;
        var id;
        
        for(var i=0; i<sipImages.length; i++)
        {
            id='sip'+i;
            
            if (i==Sip.sipac)
            {
                f=true;
                $(id).style.zIndex=100;
                sizeTo(id, sipImgWidth, sipImgHeight);
                var y=Math.floor(-(sipImgHeight-sipImgSmallHeight)/2);
                moveTo(id, sipImgDeltaX*i, y);
            }
            else
            {
                if (!f)
                {
                    $(id).style.zIndex=i;
                    
                    sizeTo(id, sipImgSmallWidth, sipImgSmallHeight);
                    moveTo(id, sipImgDeltaX*i, 0);
                }
                else
                {
                    $(id).style.zIndex=100-i;
                    
                    sizeTo(id, sipImgSmallWidth, sipImgSmallHeight);
                    moveTo(id, sipImgDeltaX*i+sipImgWidth-sipImgSmallWidth, 0);
                }
            }
        }
    }
    
    addHandler($('sip'), 'mouseover', Sip.catchWheel);
    addHandler($('sip'), 'mouseout', Sip.catchWheel);
    
    sipInit();
    Sip.rebuild();
    
    return true;    
}

var _g=new Array();
var _glen=0;

function _gEnd()
{
    _g[this.id]=null;
    _glen--;
    
    if (_glen<=0)
    {
        _g=[];
        _glen=0;
    }
}

function _gStart(cl)
{
    if (_glen<=0)
    {
        _g=[];
        _glen=0;
    }
    
    this.id=_g.length;
    _glen++;
    _g.push(cl);
}

function _gNextFrame(id)
{
    return _g[id].nextFrame();
}

//-----MoverSizerSpec-----
function MoverSizerSpec(iden, x2, y2, w2, h2, x3, y3, idoldsip)
{
    this.start(this);
    this.idImg=iden;
    
    this.idoldsip=idoldsip;

    this.x1=getCSSLeft(this.idImg);
    this.y1=getCSSTop(this.idImg);
    
    this.w1=$(this.idImg).offsetWidth;
    this.h1=$(this.idImg).offsetHeight;
    
    this.x=this.x1;
    this.y=this.y1;

    this.w=this.w1;
    this.h=this.h1;

    if (x2==null)    this.x2=this.x1;
    else    this.x2=x2;
    
    this.y2=y2;

    this.x3=x3;    
    this.y3=y3;

    this.w2=w2;
    this.h2=h2;
    
    return;
}

MoverSizerSpec.prototype.x=0;
MoverSizerSpec.prototype.y=0;
MoverSizerSpec.prototype.a=4;
MoverSizerSpec.prototype.v=0;
MoverSizerSpec.prototype.timer=20;
MoverSizerSpec.prototype.zIndex=null;
MoverSizerSpec.prototype.id=null;
MoverSizerSpec.prototype.sip=0;
MoverSizerSpec.prototype.idoldsip=0;

MoverSizerSpec.prototype.x1=0;
MoverSizerSpec.prototype.y1=0;
MoverSizerSpec.prototype.x2=0;
MoverSizerSpec.prototype.y2=0;
MoverSizerSpec.prototype.x3=0;
MoverSizerSpec.prototype.y3=0;

MoverSizerSpec.prototype.nap=0;

MoverSizerSpec.prototype.h=0;
MoverSizerSpec.prototype.w=0;
MoverSizerSpec.prototype.h1=0;
MoverSizerSpec.prototype.w1=0;
MoverSizerSpec.prototype.h2=0;
MoverSizerSpec.prototype.w2=0;

MoverSizerSpec.prototype.start=_gStart;
MoverSizerSpec.prototype.end=_gEnd;

MoverSizerSpec.prototype.go=function()
{
    this.nextFrame();
    
    return true;
}

MoverSizerSpec.prototype.nextFrame=function()
{
    $(this.idImg).sipstop=1;
    
    if (this.sip!=Sip.sipac)
    {
        $(this.idImg).sipstop=0;
        this.end();
        
        return;
    }
    
    if (!this.nap)
    {
        if (this.x1<this.x2)
        {
            this.x+=this.v;
        }
        else
        {
            this.x-=this.v;
        }    
        
        if (this.x>this.x1 && this.x>this.x2)    this.x=this.x2;
        if (this.x<this.x1 && this.x<this.x2)    this.x=this.x2;
        
    
        if (this.y1<this.y2)
        {
            this.y+=this.v;
        }
        else
        {
            this.y-=this.v;
        }
        
        if (this.y>this.y1 && this.y>this.y2)    this.y=this.y2;
        if (this.y<this.y1 && this.y<this.y2)    this.y=this.y2;
        
    
        if (this.h1<this.h2)
        {
            this.h+=this.v;
        }
        else
        {
            this.h-=this.v;
        }    

        if (this.h>this.h1 && this.h>this.h2)    this.h=this.h2;
        if (this.h<this.h1 && this.h<this.h2)    this.h=this.h2;    

        if (this.w1<this.w2)
        {
            this.w+=this.v;
        }
        else
        {
            this.w-=this.v;
        }    

        if (this.w>this.w1 && this.w>this.w2)    this.w=this.w2;
        if (this.w<this.w1 && this.w<this.w2)    this.w=this.w2;    

        this.v+=this.a;
    }
    else
    {
        if (this.x2<this.x3)
        {
            this.x+=this.v;
        }
        else
        {
            this.x-=this.v;
        }    
        
        if (this.x>this.x2 && this.x>this.x3)    this.x=this.x3;
        if (this.x<this.x2 && this.x<this.x3)    this.x=this.x3;
        
        if (this.y2<this.y3)
        {
            this.y+=this.v;
        }
        else
        {
            this.y-=this.v;
        }
        
        if (this.y>this.y2 && this.y>this.y3)    this.y=this.y3;
        if (this.y<this.y2 && this.y<this.y3)    this.y=this.y3;
        
        if (this.h1<this.h2)
        {
            this.h+=this.v;
        }
        else
        {
            this.h-=this.v;
        }    

        if (this.h>this.h1 && this.h>this.h2)    this.h=this.h2;
        if (this.h<this.h1 && this.h<this.h2)    this.h=this.h2;    

        if (this.w1<this.w2)
        {
            this.w+=this.v;
        }
        else
        {
            this.w-=this.v;
        }    

        if (this.w>this.w1 && this.w>this.w2)    this.w=this.w2;
        if (this.w<this.w1 && this.w<this.w2)    this.w=this.w2;    

        this.v+=this.a;    
    }
    
    moveTo(this.idImg, this.x, this.y);
    sizeTo(this.idImg, this.w, this.h);

    if (!this.nap)
    {
        if (this.x==this.x2 && this.y==this.y2 && this.w==this.w2 && this.h==this.h2)
        {
            this.nap++;
            this.v=0;
            if (this.zIndex!=null)    $(this.idImg).style.zIndex=this.zIndex;
            
            $(this.idoldsip).style.zIndex=99;
            setTimeout('_gNextFrame('+this.id+');', this.timer);
        }
        else    setTimeout('_gNextFrame('+this.id+');', this.timer);
    }
    else
    {
        if (this.x==this.x3 && this.y==this.y3 && this.w==this.w2 && this.h==this.h2)
        {
            this.nap++;
            this.end();
            
            if (this.zIndex!=null)    $(this.idImg).style.zIndex=this.zIndex;
            $(this.idImg).sipstop=0;
            
            Sip.rebuild();
        }
        else    setTimeout('_gNextFrame('+this.id+');', this.timer);
    }
}

//-----MoverSizer-----
function MoverSizer(iden, x2, y2, w2, h2)
{
    this.start(this);
    this.idImg=iden;
    
    this.x1=getCSSLeft(this.idImg);
    this.y1=getCSSTop(this.idImg);
    
    this.w1=$(this.idImg).offsetWidth;
    this.h1=$(this.idImg).offsetHeight;
    
    this.x=this.x1;
    this.y=this.y1;

    this.w=this.w1;
    this.h=this.h1;

    if (x2==null)    this.x2=this.x1;
    else    this.x2=x2;
    
    if (y2==null)    this.y2=this.y1;
    else        this.y2=y2;
    
    this.w2=w2;
    this.h2=h2;
    
    return;
}

MoverSizer.prototype.x=0;
MoverSizer.prototype.y=0;
MoverSizer.prototype.a=4;
MoverSizer.prototype.v=0;
MoverSizer.prototype.timer=20;
MoverSizer.prototype.zIndex=null;
MoverSizer.prototype.id=null;
MoverSizer.prototype.sip=0;

MoverSizer.prototype.x1=0;
MoverSizer.prototype.y1=0;
MoverSizer.prototype.x2=0;
MoverSizer.prototype.y2=0;

MoverSizer.prototype.h=0;
MoverSizer.prototype.w=0;
MoverSizer.prototype.h1=0;
MoverSizer.prototype.w1=0;
MoverSizer.prototype.h2=0;
MoverSizer.prototype.w2=0;

MoverSizer.prototype.sip=null;

MoverSizer.prototype.start=_gStart;
MoverSizer.prototype.end=_gEnd;

MoverSizer.prototype.go=function()
{
    this.nextFrame();
    
    return true;
}

MoverSizer.prototype.nextFrame=function()
{
    $(this.idImg).sipstop=1;
    
    if (this.sip!=null && this.sip!=Sip.sipoldac)
    {
        $(this.idImg).sipstop=0;
        this.end();
        
        return;
    }

    if (this.x1<this.x2)    this.x+=this.v;
    else    this.x-=this.v;
    
    if (this.x>this.x1 && this.x>this.x2)    this.x=this.x2;
    if (this.x<this.x1 && this.x<this.x2)    this.x=this.x2;
    

    if (this.y1<this.y2)    this.y+=this.v;
    else    this.y-=this.v;
    
    if (this.y>this.y1 && this.y>this.y2)    this.y=this.y2;
    if (this.y<this.y1 && this.y<this.y2)    this.y=this.y2;
    
    if (this.h1<this.h2)    this.h+=this.v;
    else    this.h-=this.v;

    if (this.h>this.h1 && this.h>this.h2)    this.h=this.h2;
    if (this.h<this.h1 && this.h<this.h2)    this.h=this.h2;    

    if (this.w1<this.w2)    this.w+=this.v;
    else    this.w-=this.v;

    if (this.w>this.w1 && this.w>this.w2)    this.w=this.w2;
    if (this.w<this.w1 && this.w<this.w2)    this.w=this.w2;    

    this.v+=this.a;

    moveTo(this.idImg, this.x, this.y);
    sizeTo(this.idImg, this.w, this.h);
    
    if (this.x==this.x2 && this.y==this.y2 && this.w==this.w2 && this.h==this.h2)
    {
        if (this.zIndex!=null)    $(this.idImg).style.zIndex=this.zIndex;
        $(this.idImg).sipstop=0;
        
        this.end();
    }
    else    setTimeout('_gNextFrame('+this.id+');', this.timer);
}

//-----lib-----
function $(id)    {return document.getElementById(id);}

function nopx(text)
{
    return parseInt(text.replace(/px/, ''));
}

function getCSSTop(id)
{
    return nopx($(id).style.top);
}

function getCSSLeft(id)
{
    return nopx($(id).style.left);
}

function getTargetId(e)
{
    return window.event ? window.event.srcElement.id : e.currentTarget.id;
}

function sizeTo(id, w, h)
{
    $(id).style.width=''+w+'px';
    $(id).style.height=''+h+'px';
}

function moveTo(id, x, y)
{
    $(id).style.left=''+x+'px';
    $(id).style.top=''+y+'px';
}

function addHandler(aObj, aEvent, aFunc)
{
    if (aObj.addEventListener)
    {
        aObj.addEventListener(aEvent, aFunc, false);
    }
    else if (aObj.attachEvent)
    {
        try
        {
            aObj.attachEvent('on' + aEvent, aFunc);
        }
        catch (aEx) {}
    }
}

function removeHandler(aObj, aEvent, aFunc)
{
    if (aObj.removeEventListener)
    {
        aObj.removeEventListener(aEvent, aFunc, false);
    }
    else if (aObj.detachEvent)
    {
        try
        {
            aObj.detachEvent('on' + aEvent, aFunc);
        }
        catch (aEx) {}
    }
}

//addHandler(window, 'load', Sip);