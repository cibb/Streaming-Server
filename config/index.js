'use strict';

var _ = require('underscore');
var utils = require('../shared/utils');
var CONFIG = require('./default');

function get(keys, defaultValue) {
    var value = utils.get(CONFIG, keys);

    if (checkValue(value)) {
        value = defaultValue;
        keys = _.clone(utils.toArray(keys));
        if (keys.length) {
            value = utils.get(CONFIG, keys.splice(keys.length - 1, 1, 'default'), defaultValue);
        }
    }
    return value;
}

function checkValue(value) {
    return value === null || _.isUndefined(value);
}

module.exports = {
    get: get
};
