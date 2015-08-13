'use strict';

module.exports = function(grunt) {
    var copy = {
        css: {
            files: [{
                expand: true,
                flatten: true,
                cwd: 'client/css/',
                src: '**',
                dest: 'public/css'
            }]
        }
    };

    return copy;
};
