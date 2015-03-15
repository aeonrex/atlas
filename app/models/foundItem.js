/**
 * Created by taylorks on 3/10/15.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var foundItem = new Schema({
    url: {
        type: String,
        required: true,
        //   unique: true
        index: 'hashed'
    },
    foundDate: {
        type: Date,
        required: false
    },
    crawlDate: {
        type: Date,
        required: false
    },
    parent: {
        type: String,
        required: false
    }
}/*,{autoIndex: false}*/);

module.exports = mongoose.model('foundItem', foundItem);
