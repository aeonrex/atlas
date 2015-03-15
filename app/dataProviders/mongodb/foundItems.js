/**
 * Created by taylorks on 3/10/15.
 */
'use strict';

var FoundModel = require('../../models/foundItem');

module.exports = {

    contains: function (url, callback) {
        FoundModel.collection.findOne({url: url}, function (err, doc) {
            if (err) return console.log(err);
            callback(doc);
        });
    },

    insert: function (url, callback) {
        var found = new FoundModel({
            url: url,
            time: new Date()
        });

        found.save(function (err) {
            if (err) {
                console.log(err);
            }
            callback();
        })
    }

};
