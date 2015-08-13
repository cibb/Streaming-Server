'use strict';

var os = require('os');
var cluster = require('cluster');

module.exports = function clusters(done) {
    var cpuCount;
    var i;

    if (cluster.isMaster) {
        cpuCount = os.cpus().length;

        done.abort();

        for (i = 0; i < cpuCount; i++) {
            cluster.fork();
        }
        cluster.on('exit', function onClusterExit(worker) {
            console.log('Express server %d exiting', worker.id);
            cluster.fork();
        });
    }
    else {
        done.apply(null, [].slice.call(arguments, 1).concat([cluster.worker]));
    }
};