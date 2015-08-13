'use strict';

var _ = require('underscore');
var utils = require('../../utils');

function Cookies(req, res, callback) {
    var host = req.host.split('.');
    var hasM = !!~host.indexOf('m');
    var domain = [''];
    var slice = 1;

    if (hasM) {
        slice++;
    }
    domain = domain.concat(host.slice(slice)).join('.');
    this.getAll = function() {
        return _.clone(_.omit(req.cookies || {}, ['Expires']));
    };

    this.get = function(key, dephault) {
        if (req.cookies) {
            var value = req.cookies[key];

            return (typeof value === 'undefined' ? dephault : value);
        }
        return dephault;
    };

    this.put = function(key, value, options) {
        if (res.cookie) {
            try {
                encodeURIComponent(value);
            }
            catch (e) {
                return;
            }
            res.cookie(key, value, _.extend({
                maxAge: 2 * utils.YEAR,
                domain: domain,
                overwrite: true
            }, options || {}));
        }
    };

    this.clear = function(key) {
        res.clearCookie(key, {
            path: '/',
            domain: domain,
            overwrite: true
        });
    };

    callback(this);
};

module.exports = Cookies;
