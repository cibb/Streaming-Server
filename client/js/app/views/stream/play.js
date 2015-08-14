'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Base = require('../../bases/view');
var template = require('../../../../templates/partials/play.html');

module.exports = Base.extend({
    id: 'play',
    tagName: 'section',
    template: template,
    events: _.extend({}, Base.prototype.events, {
        'click .audio': onAudio,
        'click .video': onVideo
    })
});

function onAudio(event) {
    event.preventDefaul();

    window.location = 'pdev.ncci.com.ar/audio';
}
function onVideo(event) {
    event.preventDefaul();

    window.location = 'pdev.ncci.com.ar/video';
}

