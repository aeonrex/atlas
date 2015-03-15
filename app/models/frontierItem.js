/**
 * Created by taylorks on 3/10/15.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var frontierItem = new Schema({
    url: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: false
    },
    parent: {
        type: String,
        required: false
    },
    data: {
        type: String,
        required: false

    }
}/*,{autoIndex: false}*/);


module.exports = mongoose.model('frontierItem', frontierItem);
