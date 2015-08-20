'use strict';

var _ = require('underscore');
var object = require('./object');
var time = require('./time');
var linker = require('./linker');
var string = require('./string');
var crypto = require('./crypto');
var array = require('./array');
var isServer = (typeof window === 'undefined');



function daysDiff(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();

    return Math.abs(Math.round(diff / (24 * 60 * 60 * 1000)));
}

function getUserAgent(req) {
    if (!isServer) {
        return '';
    }
    return req.get('user-agent');
}

function isMobile(req) {
    var userAgent = req.header('user-agent');
    var mobile = false;

    if (/mobile/i.test(userAgent)) {
        mobile = true;
    }

    return mobile;
}

function sort(params, comparator) {
    var sorted = {};

    _.chain(params).keys().sort(comparator).forEach(function(key) {
        sorted[key] = params[key];
    });
    return sorted;
}

function keysToLowerCase(source) {
    var keys = Object.keys(source);
    var length = keys.length;
    var target = {};
    var key;

    while (length--) {
      key = keys[length];
      target[key.toLowerCase()] = source[key];
    }
    return target;
}

function getUrlParam(param) {
    var url = window.location.search.substring(1);
    var query = url.split('&');

    for (var i = 0; i < query.length; i++) {
        var paramName = query[i].split('=');

        if (paramName[0] == param) {
            return paramName[1];
        }
    }
}

function noop() {}

module.exports = _.extend({
    isServer: isServer,
    daysDiff: daysDiff,
    getUserAgent: getUserAgent,
    isMobile: isMobile,
    sort: sort,
    keysToLowerCase: keysToLowerCase,
    getUrlParam: getUrlParam,
    noop: noop
}, object, time, linker, string, crypto, array);
