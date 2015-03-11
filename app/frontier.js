/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var frontier = [];

var add = function (urls) {
    if (Array.isArray(urls)) {
        frontier = frontier.concat(urls);
    } else {
        frontier.push(urls);
    }
};

var dequeue = function () {
    return frontier.shift();
};


var size = function () {
    return frontier.length;
};



module.exports = {
    add: add,
    dequeue: dequeue,
    size: size,
    self: frontier
};
