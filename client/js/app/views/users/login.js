'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Base = require('../../bases/view');
var template = require('../../../../templates/partials/login.html');

module.exports = Base.extend({
    id: 'login',
    tagName: 'section',
    template: template,
    events: _.extend({}, Base.prototype.events, {
        'click .submit-login': 'onSubmitLogin'
    }),
    onSubmitLogin: function(event) {
        event.preventDefault();
     
        var $form = $('form');
        var data = {
            username: $form.find('input[name="username"]').val(),
            password: $form.find('input[type="password"]').val()
        };

        var validated = validate(data, 'login');

        if (validated) {
            $form.submit();
        } else {
            showNotification('Login', 'Complete todos los campos');
        }
    }
});


function validate(data, section) {
    if (section = 'login') {
        if ($.isEmptyObject(data.username) || $.isEmptyObject(data.password)) {
            showNotification('Login', 'No olvide completar los campos');
            $('.fake-input').addClass('error');
            return false;
        }
        return true;
    }
}

function showNotification (title, message) {
    var $errors = $('.errors');

    $errors.find('.error-type').html(title);
    $errors.find('.error-content').html(message);
    $errors.removeClass('hide');
    $errors.fadeOut(8000, function() {
        $errors.addClass('hide');
        $errors.removeAttr('style');
    });
}
