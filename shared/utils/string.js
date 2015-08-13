'use strict';

function startsWith(str, starts) {
    if (starts === '') {
        return true;
    }
    if (str == null || starts == null) {
        return false;
    }
    str = String(str);
    starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
}

function endsWith(str, ends) {
    if (ends === '') {
        return true;
    }
    if (str == null || ends == null) {
        return false;
    }
    str = String(str);
    ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
}

function underscorize(str) {
    return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
}

function chop(str, step) {
    if (str === null) return [];
    str = String(str);
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
}

module.exports = {
    startsWith: startsWith,
    endsWith: endsWith,
    underscorize: underscorize,
    chop: chop
};
