'use strict';

var config = require('../../config');
var Router = require('express').Router;
var rest = require('restler');
var utils = require('../../shared/utils');

module.exports = function route(app, callback) {
    var router = new Router();

    router.get('/', handlerHome);
    function handlerHome(req, res) {
        var mobile = utils.isMobile(req);

        res.render('index', { mobile: mobile });
    }


    function login() {
        router.post('/login', handler);

        function handler(req, res, next) {
            var api = config.get(['api', 'host']);

            rest.post(api + 'users/login', {
                data: { 
                    username: req.body.username,
                    password: req.body.password
                }
            }).on('complete', function(data, response) {
                if (data.success) {
                    req.session.user = req.body.username;
                    req.session.token = '';
                    req.session.logged = true;
                    res.redirect('/play');
                }
            });
        }

        return handler;
    }

    function logout() {
        router.get('/logout', handler);

        function handler(req, res) {
            req.session.logged = false;
            res.redirect('/');
        }
    }

    router.get('*', handlerGet);
    function handlerGet(req, res) {
        var mobile = utils.isMobile(req);

        if (req.session.logged) {
            res.render('index', { mobile: mobile });
        } else {
            res.redirect('/', { mobile: mobile });
        }
    }
    router.routes = {
        login: login(),
        logout: logout()
    };

    callback(router);
};
