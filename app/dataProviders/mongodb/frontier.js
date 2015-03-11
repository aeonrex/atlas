/**
 * Created by taylorks on 3/10/15.
 */
'use strict';

var _ = require('vulcan').util._,
    async = require('async'),
    FrontierModel = require('../../models/frontier');


module.exports = {

    insertBatch: function (array, callback) {
        if (array.length === 0 ) {
            return;
        }
        FrontierModel.collection.insert(array, function (err, doc) {
            if (err) throw err;
            console.log('done');
        });
    },

    getNextBatch: function (n, cb) {
        FrontierModel
            .find()
            .limit(n)
            .exec(function (err, results) {
                if (err) return console.log(err);
                if (typeof cb === 'function') {

                    async.each(results, function (result, callback) {
                       FrontierModel.findByIdAndRemove(result.id, function (err) {
                           if (err) return callback (err);
                           callback();
                       });
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                          cb(results);
                        }

                    });

                    /*callback(results);
                    _.forEach(results, function (result) {
                        FrontierModel.findByIdAndRemove(result.id);
                    });*/
                }
            });
    },

    removeBatch: function (ids) {
        _.forEach(ids, function (id) {
           FrontierModel.collection.findByIdAndRemove(id, function (err) {
               if (err) return console.log(err);
           });
        });
    }

};
