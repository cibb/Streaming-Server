'use strict';

var Cookies = require('./cookies');
var Memcached = require('./memcached');

function Server(app, callback) {
    var req = app.req;
    var res = app.req.res;

    if (req.subdomains.pop() !== 'wap') {
        Cookies.call(this, req, res, callback);
    }
    else {
        Memcached.call(this, req, res, callback);
    }
};

module.exports = Server;
