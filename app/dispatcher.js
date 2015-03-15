/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var async = require('async'),
    _ = require('vulcan').util._,
    visitTask = require('./tasks/visit');

function Dispatcher(options) {
    options = options || {};

    this.concurrentLimit = options.concurrentLimit || 4;
    this.requestTimeout = options.requestTimeout || 500;

    this.tasks = [];

    this._dispatchProcess = undefined;

    this.prepare = function (crawlItems) {
        var self = this;

        _.forEach(crawlItems, function (item) {
            if (!item) {
                return false;
            }
            self.tasks.push(function() {
                visitTask(item)
            });
        });
    };

    this.loopTimeout = function (i, max, interval, func) {
        var self = this;

        if (i >= max) {
            return;
        }
        if (typeof func === 'function') {
            func(i++);
        }

        setTimeout(function () {
            self.loopTimeout(i, max, interval, func);
        }, interval);
    };

    this.getTaskCount = function () {
        return this.tasks.length;
    }
}

Dispatcher.prototype.dispatch = function (resources) {
    if (!Array.isArray(resources)) {
        return;
    }

    var self = this;
    self.prepare(resources);

    if (!self._dispatchProcess) {
        self._dispatchProcess = setInterval(function () {
            try {
                if (self.getTaskCount() === 0) {
                    return;
                }

                var i = 0,
                    concurrentTasks = [];

                for (i; i < self.concurrentLimit; i++) {
                    concurrentTasks.push(self.tasks.shift());
                }

                async.parallel(concurrentTasks);

            } catch (e) {
                console.log(e);
            }
        }, self.requestTimeout);
    }
};

module.exports = Dispatcher;
