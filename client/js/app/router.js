'use strict';

// TODO: make this works jajaja
var Backbone = require('backbone');
var BaseView = require('./bases/view');
var HomeView = require('./views/users/login');
var LoginView = require('./views/users/login');
var RegisterView = require('./views/users/register');
var playView = require('./views/stream/play');
var audioView = require('./views/stream/audio');
var videoView = require('./views/stream/video');

module.exports = Backbone.Router.extend({
    routes: {
        '': home,
        login: login,
        register: register,
        play: play,
        audio: audio,
        video: video
    }
});

function home() {
    this.app.show(new HomeView());
}

function login() {
    console.log('login');
	this.app.show(new LoginView());
}

function register() {
    this.app.show(new RegisterView());
}

function play() {
    this.app.show(new playView());
}

function audio() {
    this.app.show(new audioView());
}

function video() {
    this.app.show(new videoView());
}


