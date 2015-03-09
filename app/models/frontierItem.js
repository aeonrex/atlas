/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

module.exports = function (url, parent) {
    return {
        url: url,
        data: null,
        time: new Date(),
        parent: parent
    };
};
