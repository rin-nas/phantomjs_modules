/*
Утилиты для PhantomJS.

Интерфейс модуля максимально совместим с модулем Util из NodeJS,
https://nodejs.org/dist/latest-v8.x/docs/api/util.html
*/

'use strict';

var Util = {

    /**
     * The Util.inspect() method returns a string representation of object that is primarily useful for debugging.
     * Documentation: https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_inspect_object_options
     *
     * @param   {Any} obj
     * @returns {string}  Returns a string representation of object that is primarily useful for debugging
     */
    inspect : function (obj) {
        var s = JSON.stringify(obj, function(k, v) {
            //https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
            //https://learn.javascript.ru/class-instanceof
            if (v === null) return 'null:';
            if (v === undefined) return 'undefined:';  //запрещаем JSON.stringify() удалять значения undefined
            //v.constructor.name has one of Boolean|String|Number|Array|Object|RegExp|Function|Generator|Symbol
            if (['RegExp','Function'].indexOf(v.constructor.name) > -1)
                return v.constructor.name + ':' + v.toString();
            return v;
        }, 4);
        //return s;
        return s
            //последовательность замен важна!
            .replace(/"(null|undefined):"/g, '$1')
            .replace(/"([a-zA-Z_\d]+)":/g, '$1:')  //Object keys - избавляемся от лишних кавычек
            .replace(/"RegExp:(\/(?:[^"\\]|\\.)+\/[a-zA-Z]*)"/g, function($0, $1) {
                return $1.replace(/\\([\s\S])/g, '$1'); //unescape
            })
            .replace(/"Function:((?:[^"\\]|\\.)+)"/g, function($0, $1, offset, str) {
                var f = $1.replace(/\\([\s\S])/g, function($0, $1) { //unescape
                    //http://www.json.org/
                    var tr = {
                        'b' : '\b',
                        'f' : '\f',
                        'n' : '\n',
                        'r' : '\r',
                        't' : '\t',
                    };
                    return $1 in tr ? tr[$1] : $1;
                });
                var indent = str.slice(0, offset).split('\n').pop().replace(/[^\x20]/g, ' ');
                if (indent.length) f = f.replace(/\n/g, '\n' + indent);
                return f;
            })
            //array smart pretty format:
            .replace(/\[(\n\x20+)(\S+(?:\1\S+)*)\n\x20+\]/g, function ($0, $1, $2) {
                return '[' + $2.replace(/\n\x20+/g, ' ') + ']';
            });
    },

    /**
     * The Util.format() method returns a formatted string using the first argument as a printf-like format.
     * Documentation: https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_format_format_args
     *
     * Ported from: https://github.com/nodejs/node/blob/master/lib/util.js
     *
     * @param   {String} f
     * @returns {String}
     */
    format : function (f /*[, ...args]*/) {
        var i, tempStr;
        if (typeof f !== 'string') {
            if (arguments.length === 0) return '';
            var res = '';
            for (i = 0; i < arguments.length - 1; i++) {
                res += Util.inspect(arguments[i]);
                res += ' ';
            }
            res += Util.inspect(arguments[i]);
            return res;
        }

        if (arguments.length === 1) return f;

        var str = '';
        var a = 1;
        var lastPos = 0;
        for (i = 0; i < f.length - 1; i++) {
            if (f.charCodeAt(i) === 37) { // '%'
                var nextChar = f.charCodeAt(++i);
                if (a !== arguments.length) {
                    switch (nextChar) {
                        case 115: // 's'
                            tempStr = String(arguments[a++]);
                            break;
                        case 106: // 'j'
                            tempStr = tryStringify(arguments[a++]);
                            break;
                        case 100: // 'd'
                            tempStr = Number(arguments[a++]);
                            break;
                        case 79: // 'O'
                            tempStr = Util.inspect(arguments[a++]);
                            break;
                        case 111: // 'o'
                            tempStr = Util.inspect(arguments[a++],
                                { showHidden: true, depth: 4, showProxy: true });
                            break;
                        case 105: // 'i'
                            tempStr = parseInt(arguments[a++]);
                            break;
                        case 102: // 'f'
                            tempStr = parseFloat(arguments[a++]);
                            break;
                        case 37: // '%'
                            str += f.slice(lastPos, i);
                            lastPos = i + 1;
                            continue;
                        default: // any other character is not a correct placeholder
                            continue;
                    }
                    if (lastPos !== i - 1)
                        str += f.slice(lastPos, i - 1);
                    str += tempStr;
                    lastPos = i + 1;
                } else if (nextChar === 37) {
                    str += f.slice(lastPos, i);
                    lastPos = i + 1;
                }
            }
        }
        if (lastPos === 0)
            str = f;
        else if (lastPos < f.length)
            str += f.slice(lastPos);
        while (a < arguments.length) {
            var x = arguments[a++];
            if ((typeof x !== 'object' && typeof x !== 'symbol') || x === null) {
                str += ' ' + x;
            } else {
                str += ' ' + Util.inspect(x);
            }
        }
        return str;
    },

};

module.exports = Util;