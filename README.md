#PhantomJS v2.1.x to NodeJS v8.x adapter for using NodeJS modules in PhantomJS

**Usage:**

1) Install some NodeJS modules (ECMA2015 polyfills):

    ```
    $ cd phantomjs_modules
    $ ./install.sh
    ```
  
2) Start your PhantomJS javascript code with:

    `phantom.injectJs('./phantomjs_modules/nodejs-adapter.js');`
    
3) Require NodeJS modules, for example, [minimist](https://github.com/substack/minimist):

    ```
    var argv = process.argv.slice(1), 
        options = require('minimist')(argv);
    ```