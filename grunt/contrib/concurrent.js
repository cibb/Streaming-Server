'use strict';

module.exports = function(grunt) {
    return {
        options: {
            logConcurrentOutput: true
        },
        start: {
            tasks: ['nodemon:start', 'watch']
        },
        debug: {
            tasks: ['nodemon:debug', 'watch']
        }
    };
};