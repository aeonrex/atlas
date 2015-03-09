/**
 * Created by taylorks on 3/7/15.
 */
module.exports = function (url, parent) {
    'use strict';
    return {
        url: url,
        data: null,
        time: new Date(),
        parent: parent
    };
};
