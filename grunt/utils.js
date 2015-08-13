'use strict';

var _ = require('underscore');

module.exports = {
    option: option
};

function option(grunt, keys, defaultValue) {
    var value;

    if (_.isString(keys)) {
        keys = [keys];
    }
    _.each(keys, function each(k) {
        if (typeof value === 'undefined') {
            value = grunt.option(k);
        }
    });
    return (typeof value === 'undefined' ? defaultValue : value);
}
