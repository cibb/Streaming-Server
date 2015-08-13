'use strict';

var config = require('../../config');
var knex = require('knex')(config.get('mysql'));

module.exports = require('bookshelf')(knex);