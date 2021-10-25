const mysql = require('mysql');

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'a123456',
    database: 'blog'
}


var connection = mysql.createConnection(config);
connection.connect()

module.exports = {
    connection
}