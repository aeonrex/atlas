/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var visitTask = require('./tasks/visit');

function Dispatcher(options) {
    options = options || {};

    this.concurrentLimit = options.concurrentLimit || 1;
    this.requestTimeout = options.requestTimeout || 500;

    this.taskCount = 0;

    this.prepare = function (resources) {
        var self = this;
        return resources.filter(function (res) {
            return res;
        }).map(function (resource) {

            return function () {
                visitTask(resource);
                self.taskCount--;
            };
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
        return this.taskCount;
    }
}

Dispatcher.prototype.dispatch = function (resources) {
    if (!Array.isArray(resources)) {
        return;
    }

    var self = this,
        tasks = self.prepare(resources);

    self.taskCount += tasks.length;

    // TODO: split into concurrent batches, then per each iteration to async.parallel
    self.loopTimeout(0, tasks.length, self.requestTimeout, function (i) {
        try {
            tasks[i]();
        } catch (e) {
            console.error(e);
        }
    });
};

module.exports = Dispatcher;
