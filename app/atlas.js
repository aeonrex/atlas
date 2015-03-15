/**
 * Created by taylorks on 3/8/15.
 */


//TODO: on exit or SIGINT -- GET current frontier in memory add it back to db, put tasked urls back into db

module.exports = function () {
    'use strict';

    var Scheduler = require('./scheduler'),

        scheduler = new Scheduler({
            //TODO: not here. Either expose it to require package in future or hoist to configs.
            requestTimeout: 1000,
            batchSize: 40
        }),

        seeds = require('./seeds'),

        _seedProcess = scheduler.run('SEEDS'),

        _frontierProcess = scheduler.run('FRONTIER'),

        _listener = setInterval(function () {
            if (seeds.size() === 0) {
                clearInterval(_seedProcess);
            }

        }, 60000);
};
