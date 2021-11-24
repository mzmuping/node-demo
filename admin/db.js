const mysql = require('mysql2');
const config = require('./config');
var pool = mysql.createPool(config.mysql);
module.exports = pool;