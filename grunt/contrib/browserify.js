'use strict';

module.exports = function(grunt) {
    var browserify = {
        lib: {
            src: [],
            dest: 'public/js/src/libs.js',
            options: {
                alias: [
                    'node_modules/backbone/dist/jquery.js:jquery',
                    'node_modules/backbone/backbone.js:backbone',
                    'node_modules/underscore/underscore.js:underscore'
                ]
            }
        },
        app: {
            src: ['client/js/app/**/*.js'],
            dest: 'public/js/src/app.js',
            options: {
                transform: ['ractivate'],
                external: [
                    'jquery',
                    'backbone',
                    'underscore'
                ]
            }
        }
    };

    return browserify;
};
