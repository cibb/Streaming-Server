'use strict';

function getIndex(list, value) {
    var indexOf = list.indexOf(value);

    return (!~indexOf) ? 100 : indexOf - 100;
}

function sortUsingList(sourceList, orderList, property) {
    return sourceList.sort(function compare(a, b) {
        var indexOfA = getIndex(orderList, a[property]);
        var indexOfB = getIndex(orderList, b[property]);

        if (indexOfA > indexOfB) {
            return 1;
        }
        else if (indexOfB > indexOfA) {
            return -1;
        }
        return 0;
    });
}

module.exports = {
    sortUsingList: sortUsingList
};