'use strict';

var Base = require('../../bases/view');
var template = require('../../../../templates/users/register.html');
var ws = require('ws');

module.exports = Base.extend({
    id: 'register',
    tagName: 'section',
    template: template,
    events: {
        'click .submit-login': onSubmitLogin
    }
});


function onSubmitLogin() {
    event.preventDefault();
 
    var $form = $('form');
    var data = {
        username: $form.find('input[name="username"]').val(),
        lastname: $form.find('input[name="lastname"]').val(),
        password: $form.find('input[type="password"]').val()
    };
    var url = '/api/users';
    var validated = validate(data, 'register');

    if (validated) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data, textStatus, xhr) {
                if (data.status == 'error') {
                    showNotification('register', data.message);
                }
            },
            error: function (status, message) {
                console.log(status, message);
                showNotification('register', 'Error al comunicarse con la api, vuelva a intentarlo luego');
            }
        });
    }
}

function validate(data, section) {
    if (section = 'login') {
        if ($.isEmptyObject(data.username) || $.isEmptyObject(data.password)) {
            showNotification('Login', 'No olvide completar los campos');
            $('.fake-input').addClass('error');
            return false;
        }
        return true;
    } 
    else {
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
