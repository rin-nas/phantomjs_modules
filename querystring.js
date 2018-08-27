/*
 Утилиты для PhantomJS.
 Интерфейс модуля максимально совместим с модулем QueryString из NodeJS, https://nodejs.org/dist/latest-v8.x/docs/api/querystring.html
*/

'use strict';

var QueryString = (function() {

    //private methods---------------------------------------------------------------------------------------------------

    //public methods----------------------------------------------------------------------------------------------------
    return {

        /**
         * https://nodejs.org/dist/latest-v8.x/docs/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
         * See also: http://blog.stevenlevithan.com/archives/parseuri
         *
         * @param   {String} str
         * @returns {Object}
         */
        parse : function (str) {
            var a = Object.create(null);
            str.replace(/(?:^|&)([^&=]+)=?([^&]*)/g, function ($0, name, value) {
                if (! name.length) return;
                name  = QueryString.unescape(name);
                value = QueryString.unescape(value);
                if (name in a) {
                    if (! Array.isArray(a[name])) a[name] = [ a[name] ];
                    a[name].push(value);
                }
                else a[name] = value;
            });
            return a;
        },

        /**
         * https://nodejs.org/dist/latest-v8.x/docs/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options
         *
         * @param   {Object} obj
         * @param   {String|undefined} sep
         * @param   {String|undefined} eq
         * @returns {String}
         */
        stringify : function (obj, sep, eq) {
            sep = sep || '&';
            eq  = eq  || '=';
            //TODO - доделать
            throw Error('TODO - доделать');
        },

        /**
         * https://nodejs.org/dist/latest-v8.x/docs/api/querystring.html#querystring_querystring_escape_str
         *
         * @param   {String} str
         * @returns {String}
         */
        escape : function (str) {
            return encodeURIComponent(str).replace(/%5B/g, '[').replace(/%5D/g, ']')  //PHP's array readable
        },

        /**
         * https://nodejs.org/dist/latest-v8.x/docs/api/querystring.html#querystring_querystring_unescape_str
         *
         * @param   {String} str
         * @returns {String}
         */
        unescape : function (str) {
            try {
                return decodeURIComponent(str);
            }
            catch (e) {
                return '\uFFFD'; //REPLACEMENT CHARACTER for broken char, see https://en.wikipedia.org/wiki/Specials_(Unicode_block)
            }
        },

    }
})();

module.exports = QueryString;