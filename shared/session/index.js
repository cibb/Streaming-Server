'use strict';

var _ = require('underscore');
var utils = require('../utils');

if (utils.isServer) {
    var serverSessionModule = './server';
    var ServerSession = require(serverSessionModule);
}
else {
    var ClientSession = require('./client');
}

function Session(isApp, done) {
    done = done || utils.noop;
    if (isApp && utils.isServer) {
        return done();
    }
    this.session = {};
    if (utils.isServer) {
        new ServerSession(this, callback.bind(this));
    }
    else {
        new ClientSession(this, callback.bind(this));
    }

    function callback(store) {
        var session = _.extend({}, store.getAll(), this.get('session') || {}, {
            isServer: utils.isServer
        });

        if (session.user) {
            store.clear('user');
            delete session.user;
            this.set('session', _.clone(session));
        }

        function transformKey(k) {
            return k == 'user' ? 'user2' : k;
        }

        this.session.update = function(pairs) {
            for (var key in pairs) {
                session[transformKey(key)] = pairs[key];
            }
            this.set('session', _.clone(session));
        }.bind(this);

        this.session.persist = function(pairs, options) {
            for (var key in pairs) {
                store.put(transformKey(key), pairs[key], options);
            }
            this.session.update(pairs);
        }.bind(this);

        this.session.get = function(key) {
            key = transformKey(key);

            if (!key) {
                return _.clone(session);
            }

            return _.clone(session[key]);
        }.bind(this);

        this.session.clear = function(key, options) {
            key = transformKey(key);

            if (!key) {
                return;
            }
            store.clear(key, options);
            delete session[key];
            this.set('session', _.clone(session));
        }.bind(this);

        done();
    }
};

module.exports = Session;
