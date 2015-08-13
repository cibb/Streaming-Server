'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function route(app) {
    fs.readdirSync(__dirname).forEach(function each(filename) {
        var name = path.basename(filename, '.js');

        if (name === 'index') {
            return;
        }
        require('./' + name)(app, function callback(routers) {
            if (!Array.isArray(routers)) {
                routers = [routers];
            }
            routers.forEach(function each(router) {
                app.use(router.path || '/', router);
            });
        });
    });
};
