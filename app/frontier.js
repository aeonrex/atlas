/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var frontier = [],
    inProcess = false,
    dataProvider = require('./dataProviders/mongodb/frontierItems');

var add = function (urls) {
    /* if (Array.isArray(urls)) {
     frontier = frontier.concat(urls);
     } else {
     frontier.push(urls);
     } */

    dataProvider.insertBatch(urls);
};

var dequeue = function () {

    if (frontier.length === 0 && inProcess === false) {
      //  console.log("dequeue:: " + frontier.length + ' ' + inProcess );
        inProcess = true;
        dataProvider.getNextBatch(1000, function (results) {
            console.log('getNextBatch::callback '+ results);
            frontier = results;
            inProcess = false;
        });
    }

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
