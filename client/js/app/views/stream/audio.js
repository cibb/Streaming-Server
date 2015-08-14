'use strict';

var _ = require('underscore');
var Base = require('../../bases/view');
var template = require('../../../../templates/partials/audio.html');

module.exports = Base.extend({
    id: 'login',
    tagName: 'section',
    template: template,
    events: _.extend({}, Base.prototype.events, {
        'click .submit-login': 'onSubmitLogin'
    }),
});
