'use strict';

var _ = require('underscore');

function get(obj, keys, defaultValue) {
    var value;

    keys = toArray(keys);
    if (typeof defaultValue === 'undefined') {
        defaultValue = null;
    }
    if (!keys.length) {
        return defaultValue || obj;
    }
    keys.every(function iterate(key, index) {
        try {
            if (!index) {
                value = obj[key];
            }
            else {
                value = value[key];
            }
        }
        catch (err) {
            value = null;
            return false;
        }
        return true;
    });
    if (typeof value === 'undefined' || value === null) {
        return defaultValue;
    }
    return _.isFunction(value) ? value : _.clone(value);
}

function toArray(value) {
    if (!Array.isArray(value)) {
        if (typeof value === 'undefined') {
            value = [];
        } else {
            value = [value];
        }
    }
    return value;
}

module.exports = {
    get: get,
    toArray: toArray
};
