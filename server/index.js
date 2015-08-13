'use strict';

var asynquence = require('asynquence');
var bootstrap = require('./bootstrap');
var config = require('../config');

module.exports = function() {
    var promise = asynquence().or(fail);

    function fail(error) {
        var log = '%j';

        if (error instanceof Error) {
            log = '%s';
            error = error.stack;
        }
        console.error(log, error);
    }

    if (config.get(['cluster', 'enabled'], false)) {
        promise.then(require('./modules/cluster'));
    }

    promise.val(bootstrap);
};
