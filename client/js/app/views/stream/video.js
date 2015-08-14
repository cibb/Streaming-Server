'use strict';

var _ = require('underscore');
var Base = require('../../bases/view');
var template = require('../../../../templates/partials/video.html');

module.exports = Base.extend({
    id: 'video',
    tagName: 'section',
    template: template,
    events: {}
});
