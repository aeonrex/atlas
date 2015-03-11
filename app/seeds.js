/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var seeds = require('vulcan').config.get('SEEDS').map(function (seed) {
    return require('./models/crawlItem')(seed);
});

module.exports.pop = function () {
    return seeds.pop();
};

module.exports.size = function () {
    return seeds.length;
};
