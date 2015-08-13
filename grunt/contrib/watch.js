'use strict';

module.exports = function(grunt) {
    return {
        js: {
            files: ['client/js/**/*.js'],
            tasks: ['exec:removeJs', 'js']
        },
        css: {
            files: ['client/css/**/*.styl', 'client/css/**/*.css'],
            tasks: ['exec:removeCss', 'css']
        }
    };
};
