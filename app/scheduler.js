/**
 * Created by taylorks on 3/8/15.
 */
'use strict';

var _ = require('vulcan').util._,
    seeds = require('./seeds'),
    frontier = require('./frontier'),
    Dispatcher = require('./dispatcher');


function Scheduler(options) {
    options = options || {};

    this.seedBatchSize = options.seedBatchSize || 1;
    this.frontierBatchSize = options.frontierBatchSize || 500;
    this.frontierLimit = options.frontierLimit || 1000;
    this.maxQueued = options.maxQueued || 5000;

    this.dispatcher = new Dispatcher(options);

    this.types = [
        'FRONTIER',
        'SEEDS'
    ];

    this.scheduleSeeds = function () {
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

    this.scheduleFrontier = function () {
        var self = this,
            i = 0;

        return setInterval(function () {
            console.log('Task Count: ' + self.dispatcher.getTaskCount());
            if (self.dispatcher.getTaskCount() >= self.maxQueued) {
                console.log('Too much stuff going on');
                return;
            }

            var crawlItems = [];

            for (i = 0; i < self.frontierBatchSize; ++i) {
                crawlItems.push(frontier.dequeue());
            }

            self.dispatcher.dispatch(crawlItems);

        }, 5000);
    };
}

Scheduler.prototype.run = function (type) {
    switch (type) {
        case this.types[0]:
            return this.scheduleFrontier();
        case this.types[1]:
            return this.scheduleSeeds();
        default:
            break;
    }
};

module.exports = Scheduler;
