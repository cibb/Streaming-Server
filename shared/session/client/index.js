'use strict';

var _ = require('underscore');
var utils = require('../../utils');

function Client(app, callback) {
    var lifetime = 30 * utils.MINUTE / utils.SECOND;
    var host = document.domain.split('.');
    var hasM = !!~host.indexOf('m');
    var domain = [''];
    var slice = 1;

    if (hasM) {
        slice++;
    }
    domain = domain.concat(host.slice(slice)).join('.');

    function getAll() {
        var cookies = {};

        if (document.cookie) {
            document.cookie.split(';').forEach(function each(cookie) {
                cookie = cookie.split('=');
                cookies[cookie[0]] = cookie[1];
            });
        }
        return cookies;
    }

    function get(key, dephault) {
        var cookies = this.getAll();
        var value = cookies[key];

        return (typeof value === 'undefined' ? dephault : value);
    }

    function put(key, value, options) {
        if (_.isObject(value)) {
            value = encodeURIComponent('j:' + JSON.stringify(value));
        }
        var cookie = key + '=' + value;
        var properties = _.extend({
            path: '/',
            'max-age': 2 * utils.YEAR / utils.SECOND,
            domain: domain
        }, options || {});

        for (var option in properties) {
            cookie += '; ' + option + '=' + properties[option];
        }
        document.cookie = cookie;
    }

    function clear(key, options) {
        var expires = new Date();

        expires.setMonth(-1);
        put(key, '', _.extend({
            expires: expires.toUTCString()
        }, options || {}));
    }

    this.getAll = !utils.isServer ? getAll : utils.noop;
    this.get = !utils.isServer ? get : utils.noop;
    this.put = !utils.isServer ? put : utils.noop;
    this.clear = !utils.isServer ? clear : utils.noop;
    callback(this);
};

module.exports = Client;
