'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Ractive = require('ractive');

var View = Backbone.View.extend({
    tagName: 'section',
    template: '',
    render: render,
    toJSON: toJSON
});

function render() {
    this.trigger('render:pre');
    this.ractive = this.ractive || new Ractive({
        el: this.$el,
        template: _.result(this, 'template')
    });
    this.ractive.set(this.toJSON());
    this.trigger('render:post');
    return this;
}

function toJSON() {
    return {};
}

module.exports = View;
