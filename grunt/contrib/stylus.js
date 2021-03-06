'use strict';

module.exports = function(grunt) {
    var stylus = {
        options: {
            'include css': true
        },
        main: {
            files: {
                'public/css/desktop/main.css': ['client/css/**/*.css', 'client/css/**/*.styl']
            }
        },
        mobile: {
            files: {
                'public/css/mobile/main.css': ['client/css/mobile/*.css']
            }
        }
    };

    return stylus;
};