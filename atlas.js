/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var vulcan = require('vulcan');

vulcan.hammer(function () {
    require('./lib/dbConnect');
    require('./app/atlas')();
});
