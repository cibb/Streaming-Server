'use strict';

var asynquence = require('asynquence');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var express = require('express');
var http = require('http');
var https = require('https');
var routers = require('./routers');
var socketIo = require('socket.io');
var path = require('path');
var passport = require('passport');

module.exports = function appConf(done) {
    asynquence().or(fail)
        .then(framework)
        .val(success);

    function framework(done) {
        var app = express();
        var server = http.Server(app);
        var counter = 0;
        var headers;

        app.io = socketIo(server);
        app.io.on('connection', function onConnection(socket) {
            // headers = socket.handshake.headers;
            counter = counter + 1;
            console.log('A user connected || Total: ' + counter);
            socket.on('disconnect', function onDisconnet(){
                console.log('A user disconnected');
            });
        });

        app.use(cookieParser());
        app.set('headers', headers);

        app.set('session', '');
        app.use(passport.initialize());
        app.use(passport.session());

        
        app.disable('x-powered-by');
        app.disable('etag');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(express.static(__dirname + '/../public'));
        app.set('views', path.join(__dirname, '/../client/templates'));
        app.set('view engine', 'html');
        app.engine('html', ejs.renderFile);
        done(app, server);
    }

    function success(app, server) {
        http.globalAgent = false;
        https.globalAgent = false;
        routers(app);
        done(app, server);
    }

    function fail(error) {
        var log = '%j';

        if (error instanceof Error) {
            log = '%s';
            error = error.stack;
        }
        console.error(log, error);
    }
};