'use strict';

var asynquence = require('asynquence');
var config = require('../config');
var app = require('./app');

module.exports = function bootstrap(worker) {

    function listen(app, server) {
        var ip = config.get(['server', 'ip']);
        var port = config.get(['server', 'port']);

        server.listen(port, function onServerListening() {
            if (worker) {
                return console.log('id:%d pid:%d listening on %s:%d in %s mode', worker.id, process.pid, ip, port, app.get('env'));
            }
            console.log('pid:%d listening on %s:%d in %s mode', process.pid, ip, port, app.get('env'));
        });
    }

    function fail(error) {
        var log = '%j';

        if (error instanceof Error) {
            log = '%s';
            error = error.stack;
        }
        console.error(log, error);
    }

    asynquence().or(fail)
        .then(app)
        .val(listen);
};
