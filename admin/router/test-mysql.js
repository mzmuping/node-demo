var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a123456',
    database: 'db_test'
});

connection.connect();

connection.query('select * from tb_test', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
})

connection.end();