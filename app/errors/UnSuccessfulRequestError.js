/**
 * Created by taylorks on 3/8/15.
 */

module.exports = function (statusCode, uri) {
    return new Error('Request was not successful, response: ' + statusCode + '\nURI: ' + uri);
};
