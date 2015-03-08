/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var queue = [];

module.exports.add = function (urls) {
    switch (typeof urls) {
        case 'string':
            queue.push(urls);
            break;
        case 'object':
            queue = queue.concat(urls);
            break;
        default:
            break;
    }
};

module.exports.dequeue = function () {
    return queue.shift();
};


module.exports.size = function () {
    return queue.length;
};

