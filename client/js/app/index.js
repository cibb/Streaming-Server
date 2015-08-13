'use strict';

var Backbone = require('backbone');
var Socket = require('./modules/socket');
var App = require('./views/app');

window.$ = Backbone.$ = require('jquery');

module.exports = new App();
