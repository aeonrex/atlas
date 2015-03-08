/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var seeds = require('vulcan').config.get('SEEDS');

module.exports.pop = function () {
    return seeds.pop();
};

module.exports.size = function () {
    return seeds.length;
};
