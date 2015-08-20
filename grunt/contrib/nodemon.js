'use strict';

module.exports = function(grunt) {
    function onLog(event) {
        console.log(event.colour);
    }

    return {
        start: {
            script: 'index',
            options: {
                env: {
                    DEBUG: ''
                },
                ext: 'js,html',
                ignore: ['client', 'public'],
                callback: function(nodemon) {
                    nodemon.on('log', onLog);
                }
            }
        },
        debug: {
            script: 'index',
            options: {
                env: {
                    DEBUG: ''
                },
                ext: 'js,html',
                ignore: ['client', 'public'],
                callback: function(nodemon) {
                    nodemon.on('log', onLog);
                }
            }
        }
    };
};
