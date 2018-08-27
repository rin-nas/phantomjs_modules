#!/usr/bin/env bash
# инсталляция нужных для адаптера модулей NodeJS
# если в ../pakage.json#dependencies уже прописаны, то выполнять необязательно
cd ..\
    && npm install unorm\
    && npm install es6-shim\
    && npm install number-to-locale-string