const mysql = require('mysql');
const config = require('./config');
var pool = mysql.createPool(config.mysql);
module.exports = pool;