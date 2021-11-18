const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secretKey = require('./util').secretKey;
/***
 * 参考：https://blog.csdn.net/weixin_45295262/article/details/111828505
 */
const expressJwtAuth = expressJwt({ secret: secretKey, credentialsRequired: false, algorithms: ['HS256'] }).unless({ path: ["/user/login", "/user/register"] })

function setToken(users) {
    var token = jwt.sign(users, secretKey, { expiresIn: 60 });
    return token;
}

function setToken(users) {
    return new Promise((resole, reject) => {
        var token = jwt.sign(users, secretKey, { expiresIn: 60 });
        resole(token);
    })

}

function verToken(token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                console.log('verToken==' + error.message)
                resolve(false);
                return
            }
            resolve(decoded);
        });
    })
}

module.exports = {
    expressJwtAuth,
    setToken,
    verToken
}