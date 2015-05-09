/* 
    MouseMove
    © 2007 Селезнёв Д.Л., info@webfilin.ru
    http://webfilin.ru/instruments/mousemove/
    Версия 0.91, 09.10.2007
    Лицензия: GNU GPL
*/

var _gmousemove=new Array();

function MouseMove(data, idImg)
{
    this.aX=data[0];
    this.aY=data[1];
    this.adt=data[2];
    this.idImg=idImg;
    this.id=_gmousemove.length;
    _gmousemove.push(this);
    
    return;
}

function _gmmNextFrame(id)
{
    _gmousemove[id].nextFrame();

    return;
}

MouseMove.prototype.status=0; // 0 - stop, 1 - play
MouseMove.prototype.loop=false; // Зацикливание анимации
MouseMove.prototype.pingpong=false; // Режим пинг-понга
MouseMove.prototype.frame=0; // Текущий кадр
MouseMove.prototype.idImg=null; // Идентификатор картинки
MouseMove.prototype.aX=new Array(); // X-координаты 
MouseMove.prototype.aY=new Array(); // Y-координаты 
MouseMove.prototype.adt=new Array(); // Промежутки времени
MouseMove.prototype.paddingLeft=0; // Отступ слева
MouseMove.prototype.paddingTop=0; // Отступ сверху

MouseMove.prototype.km=1;
MouseMove.prototype.id=null;
MouseMove.prototype.isInit=null;

MouseMove.prototype.nextFrame=function()
{
    this.setFrame(this.frame);
    
    if (this.frame>=0 && this.frame<this.aX.length)
    {
        if (!this.frame && this.km==-1)    this.km*=-1;
        
        if (this.frame==this.aX.length-1)
        {
            if (this.loop)
            {
                if (this.pingpong)
                {
                    this.km*=-1;
                    this.frame+=this.km;                    
                }
                else    this.frame=0;
            }
            else    this.stop();
        }
        else    this.frame+=this.km;
        
        if (this.status)    setTimeout('_gmmNextFrame('+this.id+');', this.adt[this.frame]);
    }
    else    this.stop();
}

MouseMove.prototype.setFrame=function(fr)
{
    if (fr>=0 && fr<this.aX.length)
    {
        this.frame=fr;
        if (this.idImg!=null)
        {
            if (document.getElementById(this.idImg))
            {
                document.getElementById(this.idImg).style.left=(this.paddingLeft+this.aX[fr])+'px';
                document.getElementById(this.idImg).style.top=(this.paddingTop+this.aY[fr])+'px';
            }
        }
    }
}

MouseMove.prototype.stop=function()
{
    if (this.hideAtEnd && this.frame==this.aX.length-1)    this.showImg(false);
    this.status=0;
}

MouseMove.prototype.init=function()
{
    this.frame=0;
    this.km=1;
    this.isInit=true;
}

MouseMove.prototype.play=function()
{
    if (this.isInit==null)    this.init();
    this.status=1;
    this.nextFrame();
    this.showImg(true);
}

MouseMove.prototype.showImg=function(yes)
{
    var display='none';
    if (yes)    display='block';
    
    if (this.idImg!=null)
    {
        if (document.getElementById(this.idImg))    document.getElementById(this.idImg).style.display=display;
    }    
}