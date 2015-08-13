'use strict';

module.exports = function(grunt) {
    return {
        removeJs: 'rm -rf public/js/src public/js/min',
        removeCss: 'rm -rf public/css'
    };
};
