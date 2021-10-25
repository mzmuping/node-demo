const mysql = require('./db');

/**
 * 不需要带回调函数
 * @returns 
 */
const sqlQuery = function () {
    let arg = [].slice.call(arguments);
    return new Promise(function (resolve, reject) {
        arg.push(function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            resolve(results)
        })

        mysql.query(...arg)
    })

}


module.exports = sqlQuery

