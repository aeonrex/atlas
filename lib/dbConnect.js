/**
 * Created by taylorks on 3/10/15.
 */
'use strict';
var url = require('vulcan').config.get('DB:url'),
    mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', function () {
        console.log('connection error ');
    });
}();
