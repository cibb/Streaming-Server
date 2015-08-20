'use strict';

module.exports = function(grunt) {
    require('./grunt')(grunt);

    grunt.registerTask('js', ['browserify']);

    grunt.registerTask('css', ['copy:css', 'copy:cssDesktop', 'copy:cssMob']);

    grunt.registerTask('clean', ['exec:removeJs', 'exec:removeCss']);

    grunt.registerTask('build', ['js', 'css']);

    grunt.registerTask('compile', ['clean', 'build']);

    grunt.registerTask('debug', ['compile', 'concurrent:debug']);

    grunt.registerTask('default', ['compile', 'concurrent:start']);
};
