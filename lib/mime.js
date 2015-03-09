/**
 * Created by taylorks on 3/8/15.
 */
'use strict';

var util = require('vulcan').util,
    mimes = require('vulcan').config.get('MIMES');


var getMime = function (url) {

    var results = mimes.filter(function (mime) {
        return url.match(mime.extension);
    }).map(function (m) {
        var split = m.contentType.split('/');
        m.type = split[0];
        m.subType = split[1];
        return m;
    });

    if (results.length === 0) {
        return {};
    }
    return results[0];
};

var getType = function (contentType) {
    return contentType.split('/')[0];
};

var getSubType = function (contentType) {
    return contentType.split('/')[1];
};

module.exports = {
    getMime: getMime,
    getType: getType,
    getSubType: getSubType
};
