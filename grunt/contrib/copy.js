'use strict';

module.exports = function(grunt) {
    var copy = {
        css: {
            files: [{
                flatten: true,
                expand: true,
                src: ['client/css/**'],
                dest: 'public/css'
            }]
        },
        cssDesktop: {
            files: [{
                flatten: true,
                expand: true,
                src: ['client/css/desktop/**'],
                dest: 'public/css/desktop'
            }]
        },
        cssMob: {
            files: [{
                flatten: true,
                expand: true,
                src: ['client/css/mobile/*.css'],
                dest: 'public/css/mobile'
            }]
        }

    };

    return copy;
};
