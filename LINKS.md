

Для PhantomJS появилась отличная замена — https://developers.google.com/web/tools/puppeteer/ и, возможно, https://www.npmjs.com/package/osmosis

# Ссылки

1. http://phantomjs.org — PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.
1. https://github.com/JamesMGreene/phantomjs-extensions — A set of extensions, shims, utilities, and alternate APIs for PhantomJS
1. Cookbook
   1. Книга Phantomjs cookbook (2014) [pdf] (источник pdf), исходный код примеров: https://github.com/founddrama/phantomjs-cookbook
   1. https://github.com/founddrama/phantomjs-cookbook (исходник книги)
1. Detecting headless browsers. Как обнаружить/скрыть PhantomJS.
   1. https://www.slideshare.net/SergeyShekyan/shekyan-zhang-owasp
   1. http://engineering.shapesecurity.com/2015/01/detecting-phantomjs-based-visitors.html
1. Примеры скриптов
   1. https://github.com/ariya/phantomjs/tree/master/examples
   1. http://kselax.ru/2015/09/phantomjs-konsolnyj-vebbrauzer-dlya-novichkov/
1. Сопутствующие материалы
   1. http://api.jquery.com/ — HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers
   1. https://learn.javascript.ru/ —  учебник по JavaScript, начиная с основ, включающий в себя много тонкостей и фишек JavaScript/DOM
   1. [PhantomCSS](https://github.com/Huddle/PhantomCSS) — Visual/CSS regression testing with PhantomJS
   1. [SpookyJS](https://github.com/SpookyJS/SpookyJS) — Drive CasperJS from Node.js
   1. [CasperJS](http://casperjs.org/) — Navigation scripting & testing for PhantomJS and SlimerJS
   1. [JavaScript, Node, Puppeteer: автоматизация Chrome и веб-скрапинг](https://m.habrahabr.ru/company/ruvds/blog/341348/)
1. Тестовые страницы
   https://dopiaza.org/tools/datauri/examples/index.php — data: URI Examples

PhantomJS v2.1.1: заголовки GET запроса по умолчанию:
```json
{
    "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,*",
        "Connection": "Keep-Alive",
        "Host": "localhost:9000",
        "User-Agent": "Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1"
    },
    "httpVersion": "1.1",
    "method": "GET",
    "url": "/foo/bar.php?asdf=true"
}
```

# Дебаггер

Запустить PhantomJS с дебаггером:
`./phantomjs --remote-debugger-port=9000 --remote-debugger-autorun=yes import.js https://ya.ru/`

Открыть дебаггер на локальной машине:
`http://127.0.0.1:9000/webkit/inspector/inspector.html?page=2`
