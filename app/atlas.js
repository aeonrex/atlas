/**
 * Created by taylorks on 3/8/15.
 */
module.exports = function () {
    'use strict';

    var Crawler = require('./crawler'),

        crawler = new Crawler({
            requestTimeout: 1000,
            batchSize: 40
        }),

        seeds = require('./seeds'),
        frontier = require('./frontier'),
        found = require('./found'),

        onEnd = function () {
            console.log('Frontier: ' + frontier.size() + '\n');
            console.log(JSON.stringify(frontier.self, null, '\t'));
            console.log('Found:\n');
            console.log(JSON.stringify(found.self, null, '\t'));
            process.exit();
        },

        _seedProcess = crawler.seedCrawl(),

        _frontierProcess = crawler.frontierCrawl();

     /*   _listener = setInterval(function () {
            if (seeds.size() === 0) {
                clearInterval(_seedProcess);
            }
            if (frontier.size() === 0) {
                clearInterval(_frontierProcess);
                clearInterval(_listener);
                onEnd();
            }
        }, 60000); */
    process.on('SIGINT', onEnd);
};
