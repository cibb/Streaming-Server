'use strict';

var Backbone = require('backbone');

var LoaderView = Backbone.View.extend({
    el: '#loader',
    show: show,
    hide: hide
});

function show(callback) {
    this.$el.fadeIn('slow', callback);
}

function hide(callback) {
    this.$el.delay(750).fadeOut('slow', callback);
}

module.exports = LoaderView;
