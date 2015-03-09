/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var queue = [];

module.exports.add = function (urls) {
    if (Array.isArray(urls)) {
        queue = queue.concat(urls);
    } else {
        queue.push(urls);
    }
};

module.exports.dequeue = function () {
    return queue.shift();
};


module.exports.size = function () {
    return queue.length;
};

