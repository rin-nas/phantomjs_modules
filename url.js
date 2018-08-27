/*
 A URL string is a structured string containing multiple meaningful components.
 When parsed, a URL object is returned containing properties for each of these components.

 Интерфейс модуля максимально совместим с модулем Url из NodeJS, https://nodejs.org/dist/latest-v8.x/docs/api/url.html
 Этот модуль в своей работе использует окружение/DOM браузера.

 См. так же:
    "https://clickhouse.yandex/reference_ru.html#Функции для работы с URL"
    https://github.com/nodejs/node/blob/master/lib/url.js          (исходный код модуля URL от NodeJS)
    https://www.sitepoint.com/url-parsing-isomorphic-javascript/
*/

'use strict';

var Url = (function() {

    //private methods---------------------------------------------------------------------------------------------------

    //public methods----------------------------------------------------------------------------------------------------
    return {

        /**
         * Разбирает URL на составные части с помощью DOM браузера
         * https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
         *
         * См. так же:
         *      https://github.com/lloyd/urlparse.js
         *      http://blog.stevenlevithan.com/archives/parseuri
         *      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
         *
         * @param   {String} url
         * @returns {Object}
         */
        parse : function(url) {

            var link = document.createElement('a'),
                //захват логина и пароля, тестирование: https://regex101.com/r/VkfgXZ/8
                m = url.match(/^(?:[-a-zA-Z\d.+]+:)?\/\/(([^:@\/?\s]+)(?::([^:@\/?\s]+))?)@/);
            link.href = url;

            //PhantomJS v2.1.1 не записывает логин и пароль из URL в свойства объекта ссылки :(
            if (Array.isArray(m)) {
                link.auth     = m[1];
                link.username = decodeURIComponent(m[2]);
                link.password = decodeURIComponent(m[3]);
                link.hrefsafe = link.protocol + '//' + link.host + link.pathname + link.search + link.hash;
            }

            //for (var prop in link) console.log(prop + '=' + link[prop]);
            return {
                href:       link.href,      // https://user:pass@site.com:8080/path/page?a=1&b=2#hash
                hrefsafe:   link.hrefsafe,  // https://site.com:8080/path/page?a=1&b=2#hash  (link.href без логина и пароля, это свойство является расширением стандарта)
                auth:       link.auth,      // user:pass
                username:   link.username,  // user
                password:   link.password,  // pass
                origin:     link.origin,    // https://site.com
                protocol:   link.protocol,  // https:
                host:       link.host,      // site.com:8080
                hostname:   link.hostname,  // site.com
                port:       link.port,      // 8080
                pathname:   link.pathname,  // /path/page
                search:     link.search,    // ?a=1&b=2
                hash:       link.hash,      // #hash
            };
        },

    }

})();

module.exports = Url;