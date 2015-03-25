/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var request = require('request'),
    mime = require('../../lib/mime'),
    util = require('vulcan').util,
    found = require('../found'),
    frontier = require('../frontier'),
    requestCount = 0,
    CrawlItem = require('../models/crawlItem'),
    options = {
        method: 'GET'
    };

module.exports = function (crawlItem, textCallback, audioCallback, videoCallback, imageCallback, applicationCallback) {

    if (!crawlItem || !crawlItem.url) {
        // TODO: I don't like this, but MOVE FAST!
        console.log(crawlItem);
        throw require('../errors/InvalidFrontierItemError')();
    }
    var opt = util.copy(options);
    opt.uri = crawlItem.url;

    textCallback = textCallback || function () {
    };
    audioCallback = audioCallback || function () {
    };
    videoCallback = videoCallback || function () {
    };
    imageCallback = imageCallback || function () {
    };
    applicationCallback = applicationCallback || function () {
    };

    request(opt, function (err, res, body) {
        var contentType;
        //check success
        console.log('Request Count: ' + (++requestCount));
        if (err) {
            return console.log(err);
        }

        if (res.statusCode !== 200) {
             return console.log(require('../errors/UnSuccessfulRequestError')(res.statusCode, opt.uri));
        }

        // TODO: save crawl time and response info.
        crawlItem.data = body;

        contentType = res.headers['content-type'];
        switch (mime.getType(contentType)) {

            case 'text':
                // most important since html is a text subtype

                if (mime.getSubType(contentType).match(/html/)) {
                    // time to get links.
                    found.findLinks(crawlItem.url, body, function (links) {
                        frontier.add(links.map(function (link) {
                            return CrawlItem(link, crawlItem.url);
                        }));
                    });

                    console.log('Frontier size: ' + frontier.size());
                }
                textCallback(crawlItem);
                break;
            case 'audio':
                audioCallback(crawlItem);
                break;
            case 'video':
                videoCallback(crawlItem);
                break;
            case 'image':
                imageCallback(crawlItem);
                break;
            case 'application':
                applicationCallback(crawlItem);
                break;
            default:
                break;
        }

    });
};




