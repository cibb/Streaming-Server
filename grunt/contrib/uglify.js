'use strict';

module.exports = function(grunt) {
    var uglify = {
        js: {
            options: {
                sourceMap: true
            },
            files: [{
                expand: true,
                cwd: 'public/js/src',
                src: ['**/*.js'],
                dest: 'public/js/min'
            }]
        }
    };

    return uglify;
};
