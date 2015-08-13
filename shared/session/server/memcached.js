'use strict';

var _ = require('underscore');
var uuid = require('node-uuid');
var memcached = require('../../../server/modules/memcached');
var utils = require('../../utils');

function Memcached(req, res, callback) {
    var sid = req.param('sid');
    var lifetime = 30 * utils.MINUTE / utils.SECOND;

    if (!sid || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(sid)) {
        sid = uuid.v4();
    }
    memcached.get(sid, after.bind(this));

    function after(err, session) {
        session = session || {};
        session.sid = sid;

        function getAll() {
            return _.clone(session);
        }

        function get(key, dephault) {
            var value = session[key];

            return (typeof value === 'undefined' ? dephault : value);
        }

        function put(key, value, options) {
            session[key] = value;
            memcached.set(sid, session, lifetime, utils.noop);
        }

        function clear(key) {
            delete session[key];
            memcached.set(sid, session, lifetime, utils.noop);
        }

        this.getAll = !err ? getAll : utils.noop;
        this.get = !err ? get : utils.noop;
        this.put = !err ? put : utils.noop;
        this.clear = !err ? clear : utils.noop;
        callback(this);
    }
};

module.exports = Memcached;
