'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('users', {
        id_username: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        username: Sequelize.STRING,
        lastname: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        tableName: 'users'
    });
};
