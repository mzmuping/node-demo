const express = require('express');
const static = require('express-static');
var cookieParser = require('cookie-parser');//此中间件需要通过npm install 获得
const path = require('path');
var cors = require('cors')
const { responseClient } = require('./util');

const { expressJwtAuth, verToken } = require('./jwt')
const config = require('./config');

const userRouter = require('./router/user');
const companyRouter = require('./router/company');
const sequelizeRouter = require('./router/sequelize');
const cons = require('consolidate');

const app = express();

// 所有请求过来都会进行身份验证
// app.use(expressJwtAuth);


app.use(cors({
    origin: ["http://localhost:3000", "http://10.1.23.30:8081"],
    credentials: true,
    methods: 'PUT,POST,GET,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, device-type , token',
    maxAge: 24 * 3600 * 1000
}))
app.use(cookieParser());//运用cookie解析的中间件
app.use(express.json());//for parsing application/json
app.use(express.urlencoded({ extended: false }));// for parsing application/x-www-form-urlencoded
app.use(async (req, res, next) => {

    let url = req._parsedUrl.pathname; // 当前访问的url,不包括参数？后面的，不信你自己打印一下看看哈哈
    let whiteUrl = ['/user/login']; // 白名单，不需要验证的，暂时只有/login,后面有再加
    if (whiteUrl.indexOf(url) >= 0) {
        return next(); // 找到是白名单的，直接放行，不需要验证
    }
    let authorization = req.headers.authorization
    if (authorization) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        var parts = authorization.split(' ');
        var token = parts[1];
        let vres = await verToken(token)
        console.log('token', vres)
        if (vres) {
            next()
        } else {
            responseClient(res, 200, 401, "token失效")
        }
    } else {
        responseClient(res, 200, 3, '没有找到token')

    }
})
app.use('/user', userRouter);
app.use('/company', companyRouter)
app.use('/sequelize', sequelizeRouter)
console.log('app===', Object.prototype.toString.call(app))
app.listen(config.app.port, () => {
    console.log(`app listening at http://localhost:${config.app.port}`);
});

app.use(static(path.join(__dirname, 'static')))