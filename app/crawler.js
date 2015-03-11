/**
 * Created by taylorks on 3/8/15.
 */
'use strict';

var _ = require('vulcan').util._,
    seeds = require('./seeds'),
    frontier = require('./frontier'),
    Dispatcher = require('./dispatcher');


function Crawler(options) {
    options = options || {};

    this.seedBatchSize = options.seedBatchSize || 1;
    this.frontierBatchSize = options.frontierBatchSize || 500;
    this.frontierLimit = options.frontierLimit || 1000;
    this.maxQueued = options.maxQueued || 5000;

    this.dispatcher = new Dispatcher(options);
}


Crawler.prototype.seedCrawl = function () {
    var self = this,
        i = 0;
    return setInterval(function () {

        if (frontier.size() >= self.frontierLimit) {
            return;
        }

        var crawlItems = [];
        for (i = 0; i < self.seedBatchSize; ++i) {
            crawlItems.push(seeds.pop());
        }

        self.dispatcher.dispatch(crawlItems);

    }, 1000);
};

Crawler.prototype.frontierCrawl = function () {
    var self = this,
        i = 0;

    return setInterval(function () {
        console.log('Task Count: ' + self.dispatcher.getTaskCount());
        if (self.dispatcher.getTaskCount() >= self.maxQueued) {
            console.log('Too much stuff going on');
            return;
        }

        var
            crawlItems = [];

        for (i = 0; i < self.frontierBatchSize; ++i) {
            crawlItems.push(frontier.dequeue());
        }

        self.dispatcher.dispatch(crawlItems);

    }, 5000);
};

module.exports = Crawler;
