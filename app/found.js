/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var found = {};

var contains = function (url) {
    //TODO: add logic for recrawls.
    return found[url];
};

var add = function (url) {
  found[url] = new Date();
};

