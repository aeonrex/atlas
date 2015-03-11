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
        unique: true
    },
    time: {
        type: Date,
        required: false
    }
}/*,{autoIndex: false}*/);

module.exports = mongoose.model('found', foundItem);
