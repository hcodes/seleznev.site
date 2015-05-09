function getRandom(n) {
    return Math.floor(Math.random()*n);
}

function moveTo(query, x, y) {
    $(query).css({left: x + 'px', top: y + 'px'});
}

function getWindowWidth() {
    return window.innerWidth?window.innerWidth:document.body.clientWidth;
}

function getWindowHeight() {
    return window.innerHeight?window.innerHeight:(document.body.clientHeight?document.body.clientHeight:document.documentElement.clientHeight);
}

//-----------Inercia--------------------------------------
function Inercia(query, x1, y1, x2, y2, t1, t2) {
    this.el = $(query);

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.t1 = t1;
    this.t2 = t2;
    
    this.timer = Math.abs(t2 - t1);
    
    if (this.x1 < this.x2) {
        this.kx = 1;
    }
    else {
        this.kx = -1;
    }

    if (this.y1 < this.y2) {
        this.ky = 1;
    }
    else {
        this.ky = -1;
    }
    
    if (!(this.t1 - this.t2)) {
        this.nostart = true;
        return;
    }
    
    this.vx = Math.abs(this.x2 - this.x1);
    this.vy = Math.abs(this.y2 - this.y1);
    
    this.x = el.offset.left;
    this.y = el.offset.top;
    
    var tx = Math.abs(this.x1 - this.x2);
    var ty = Math.abs(this.y1 - this.y2);
    
    if (tx > ty) {
        this.ay = this.ax * ty / tx;
    }
    else {
        this.ax = this.ay * tx / ty;
    }
}

Inercia.prototype.x = 0;
Inercia.prototype.y = 0;
Inercia.prototype.x1 = 0;
Inercia.prototype.x2 = 0;
Inercia.prototype.y1 = 0;
Inercia.prototype.y2 = 0;
Inercia.prototype.ax = 1;
Inercia.prototype.ay = 1;
Inercia.prototype.vx = 5;
Inercia.prototype.vy = 5;
Inercia.prototype.tx = 10;
Inercia.prototype.ty = 10;
Inercia.prototype.timer = 20;
Inercia.prototype.nostart = false;
Inercia.prototype.imgWidth = 220;
Inercia.prototype.imgHeight = 150;

Inercia.prototype.start = function() {
    if (!this.nostart)    this.nextFrame();
}

Inercia.prototype.nextFrame = function() {
    if (this.vx <= 0)    this.vx = 0;
    else    this.vx -= this.ax;
    
    if (this.vy <= 0)    this.vy = 0;
    else    this.vy -= this.ay;

    this.x += this.vx * this.kx;
    this.y += this.vy * this.ky;
    
    if (this.x <= 0 || this.x > getWindowWidth() - this.imgWidth) {
        this.kx *= (-1);
        this.x += this.vx * this.kx;
    }
    
    if (this.y <= 0 || this.y > getWindowHeight() -this.imgHeight) {
        this.ky *= (-1);
        this.y += this.vy * this.ky;
    }
    
    moveTo(this.el, this.x, this.y);
    
    var obj = this;
    if (this.vx && this.vy)    setTimeout(function() {
        obj.nextFrame();
    }, this.timer);
}


// ------------------------ cookie -------------------------------
function getExpDate(days, hours, minutes) {
    var expDate = new Date();

    if (typeof days=="number" && typeof hours=="number" && typeof hours == "number") {
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