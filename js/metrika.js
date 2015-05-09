(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter385411 = new Ya.Metrika({id: 385411, trackLinks: true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName('script')[0],
        s = d.createElement('script'),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/watch.js';

    d.addEventListener('DOMContentLoaded', f, false);
})(document, window, 'yandex_metrika_callbacks');

if (window.hljs) {
    window.addEventListener('load', function() {
        var blocks = document.getElementsByTagName('code');
        for (var i = 0; i < blocks.length; i++) {
            hljs.highlightBlock(blocks[i], null, false);
        }
    });
}