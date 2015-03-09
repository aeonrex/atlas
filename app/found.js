/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var scrape = require('linkscrape'),
    util = require('vulcan').util,
    blackList = ['mp3', 'avi', 'mp4', 'jpg'],
    found = {};

var contains = function (url) {
    //TODO: add logic for recrawls.
    return found[url];
};

var add = function (url) {
    found[url] = new Date();
};


var findLinks = function (url, html) {
    // do an array match to exclude links that have black listed mime.
    var results;

    scrape(url, html, function (links) {

        results = links.filter(function (link) {
            if (link && link.link) {
                return !contains(link.link) && !util.arrayMatch(blackList, link.link.toLowerCase());
            }
            return false;
        }).map(function (link) {
            add(link.link);
            return link.link;
        });

    });

    return results;
};

module.exports = {
    contains: contains,
    add: add,
    findLinks: findLinks
};
