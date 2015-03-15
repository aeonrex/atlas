/**
 * Created by taylorks on 3/10/15.
 */
'use strict';

var _ = require('vulcan').util._,
    async = require('async'),
    FrontierModel = require('../../models/frontierItem');


var _FrontierItemDataProvider = {

    insertBatch: function (array, callback) {
        if (array.length === 0) {
            return;
        }
        FrontierModel.collection.insert(array, function (err, doc) {
            if (err) throw err;
        });
    },

    getNextBatch: function (n, cb) {
        FrontierModel
            .find()
            .limit(n)
            .exec(function (err, results) {
                if (err) return console.log(err);
                if (typeof cb === 'function') {
                    _FrontierItemDataProvider.removeBatch(results.map(function (result) {
                        return result.id;
                    }), function () {
                        cb(results);
                    });
                }
            });
    },

    removeBatch: function (ids, callback) {
        FrontierModel
            .find({_id: {$in: ids}})
            .remove()
            .exec(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    callback();
                }
            });
    }

};

module.exports = _FrontierItemDataProvider;
