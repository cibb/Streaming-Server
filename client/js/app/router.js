'use strict';

var Backbone = require('backbone');
var BaseView = require('./bases/view');
var HomeView = require('./views/users/login');
var LoginView = require('./views/users/login');
var RegisterView = require('./views/users/register');
var playView = require('./views/stream/play');

module.exports = Backbone.Router.extend({
    routes: {
        '': home,
        login: login,
        register: register,
        '/play': play
    }
});

function home() {
    this.app.show(new HomeView());
}

function login() {
	this.app.show(new LoginView());
}

function register() {
    this.app.show(new RegisterView());
}

function play() {
    this.app.show(new playView());
}

