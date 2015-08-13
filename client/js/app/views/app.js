'use strict';

var Backbone = require('backbone');
var LoaderView = require('./loader');
var Router = require('../router');

var App = Backbone.View.extend({
    el: 'body',
    initialize: initialize,
    show: show
});

function initialize() {
    this.$content = this.$('#content');
    this.loader = new LoaderView();
    this.router = new Router();
    this.router.app = this;
    Backbone.history.start({pushState: true})
}

function show(view) {
    this.loader.show(function callback() {
        this.$content.html(view.render().$el);
        this.loader.hide();
    }.bind(this));
}


module.exports = App;
