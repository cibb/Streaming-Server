'use strict';

module.exports = function(grunt) {
    var stylus = {
        options: {
            'include css': true
        },
        main: {
            files: {
                'public/css/main.css': ['client/css/**/*.css', 'client/css/**/*.styl']
            }
        }
    };

    return stylus;
};