/**
 * Created by taylorks on 3/7/15.
 */
'use strict';

var request = require('request'),
    mime = require('../../lib/mime'),
    util = require('vulcan').util,
    found = require('../found'),
    frontier = require('../frontier'),
    frontierItem = require('../models/frontierItem'),
    options = {
        method: 'GET'
    };

//TODO: make the main task performing a GET on a frontierItem


module.exports = function (frontierItem, textCallback, audioCallback, videoCallback, imageCallback, applicationCallback) {

    if (!frontierItem || !frontierItem.url) {
        // TODO: I don't like this, but MOVE FAST!
        throw require('../errors/InvalidFrontierItemError')();
    }
    var opt = util.copy(options);
    opt.url = frontierItem.url;

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

    request(options, function (err, res, body) {
        var contentType;
        //check success

        if (res.statusCode !== 200) {
            throw require('../errors/UnSuccessfulRequestError')(res.statusCode);
        }

        frontierItem.data = body;

        // check mime type? switch? for specified mime? YES MIMES ARE IMPORTANT, make something that figures out its type
        // ex. image (png, jpeg, gif, etc) text( html, json, xml, etc), audio (mp3, mp4, m**, ogg), video (avi, movie, etc.)
        // maybe.... is it necessary for it's own right?
        // think of it this way. does anyone want to do a switch statement against a list of 500000000000000 things? nope.
        // just make sure there is an explicit whitelist for those who are picky, other wise break it down to:
        // do you want text, video, audio, images? which do you want which do you not?
        // break into three managable shits

        // mimes are broken into types, hence <type>/<thing> e.g. application/javascript easy peasy, why hasn't shit like this been developed before99

        contentType = res.headers['content-type'];
        switch (mime.getType(contentType)) {

            case 'text':
                // most important since html is a text subtype

                if (mime.getSubType(contentType) === 'html') {
                    // time to get links.
                    var links = found.findLinks(frontierItem.url, body);

                    frontier.add(links.map(function (link) {
                        return frontierItem(link, frontierItem.url);
                    }));
                }
                textCallback(frontierItem);
                break;
            case 'audio':
                audioCallback(frontierItem);
                break;
            case 'video':
                videoCallback(frontierItem);
                break;
            case 'image':
                imageCallback(frontierItem);
                break;
            case 'application':
                applicationCallback(frontierItem);
                break;
            default:
                break;
        }

    });
};




