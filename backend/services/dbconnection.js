var mysql = require('mysql');
var db_config = require('../secrets/db-config.json');

var pool = mysql.createPool(db_config);

module.exports = pool;