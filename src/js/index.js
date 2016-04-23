(function() {
    var table = document.getElementById('work-table'),
        li = document.getElementsByTagName('li', table);

    for (var i = 0; i < li.length; i++) {
        li[i].style.left = (- Math.sin(i / 4) * 30) + 'px';
    }
})();