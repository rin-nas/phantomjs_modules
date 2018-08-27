/*
PhantomJS v2.1.x to NodeJS v6.x adapter
See README.md
*/

var process = phantom;

//http://wiki.commonjs.org/wiki/Modules/1.1
require.paths.unshift(
    process.libraryPath + '/lib/',               //1st priority for search modules
    process.libraryPath + '/phantomjs_modules/', //2nd priority for search modules
    process.libraryPath + '/node_modules/'       //3rd priority for search modules
);

//https://nodejs.org/dist/latest-v8.x/docs/api/console.html#console_console_dir_obj_options
console.dir = function(obj) {
    console.warn(require('util').inspect(obj));
};

//forward all errors to STDERR
//https://github.com/ariya/phantomjs/issues/10150
console.error = function() {
    require('system').stderr.write(Array.prototype.join.call(arguments, ' ') + '\n');
};

process.argv = require('system').args;  //https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_argv
process.pid  = require('system').pid;   //https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_pid
process.env  = require('system').env;   //https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env

require('unorm');    // https://github.com/walling/unorm (String.prototype.normalize)
require('es6-shim'); // https://github.com/paulmillr/es6-shim
require('es7-shim'); // /phantomjs_modules/es7-shim.js
require('number-to-locale-string'); // https://github.com/willsp/polyfill-Number.toLocaleString-with-Locales