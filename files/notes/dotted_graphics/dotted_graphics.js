/* 
   Dotted Graphics v1.0
   info@webfilin.ru
*/

var DottedGraphics = {
    halfCircle: function(radius, color) {
        var el1 = document.createElement('div');
        el1.style.width = radius + 'px';
        el1.style.height = radius + 'px';
        el1.style.overflow = 'hidden';
        
        var el2 = document.createElement('div');
        el2.style.borderTop = radius + 'px dotted ' + color;
        el1.appendChild(el2);
        
        return el1;
    },
    circle: function(radius, color) {
        var el1 = document.createElement('div');
        el1.style.width = radius + 'px';
        el1.style.height = radius + 'px';
        el1.style.overflow = 'hidden';
        
        var el2 = document.createElement('div');
        el2.style.width = 3 * radius + 'px';
        el2.style.borderTop = radius + 'px dotted ' + color;
        el2.style.marginLeft = '-' + (radius * 1.5) + 'px';
        el1.appendChild(el2);
        
        return el1;    
    },
    heart: function(size, color) {
        var el1 = document.createElement('div');
        el1.style.width = size * 2 + 'px';
        el1.style.height = size * 2 + 'px';
        el1.style.overflow = 'hidden';
        
        var el2 = document.createElement('div');
        el2.style.width = size * 2 + 1 + 'px';
        el2.style.height = size * 2 + 1 + 'px';
        el2.style.borderTop = size + 'px dotted ' + color;
        el2.style.borderLeft = size + 'px dotted ' + color;
        el1.appendChild(el2);
        
        return el1;
    },
    rectangle: function(width, height, color) {
        var el = document.createElement('div');
        el.style.backgroundColor = color;
        el.style.width = width + 'px';
        el.style.height = height + 'px';
        
        return el;
    },
    square: function(size, color) {
        return this.rectangle(size, size, color);
    }
};