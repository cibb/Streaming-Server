'use strict';

var config = require('../../config');
var Router = require('express').Router;
var rest = require('restler');
var utils = require('../../shared/utils');

module.exports = function route(app, callback) {
    var router = new Router();

    function home() {
        router.get('/', handler);

        function handler(req, res, next) {
            res.render('index');
        }

        return handler;
    }

    function loginPost() {
        router.post('/login', handler);

        function handler(req, res, next) {
            var api = config.get(['api', 'host']);

            rest.post(api + 'users/login', {
                data: { 
                    username: req.body.username,
                    password: req.body.password
                }
            }).on('complete', function(data, response) {
                console.log(data);
                if (response.statusCode == 200) {
                    app.set('session', true);
                    res.redirect('/play');
                }
            });

        }

        return handler;
    }

    function loginGet() {
        router.get('/login', handler);

        function handler(req, res, next) {
            res.render('index');
        }

        return handler;
    }

    function playGet() {
        router.get('/play', handler);

        function handler(req, res) {
            if (!!app.settings.session) {
                res.render('play');
            }
        }
    }

    function logout() {
        router.get('/logout', handler);

        function handler(req, res) {
            app.set('session', false);
            res.redirect('/');
        }
    }

    router.routes = {
        home: home(),
        loginPost: loginPost(),
        loginGet: loginGet(),
        playGet: playGet(),
        logout: logout()
    };

    callback(router);
};
