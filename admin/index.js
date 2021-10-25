const express = require('express');
const static = require('express-static');
var cookieParser = require('cookie-parser');//此中间件需要通过npm install 获得
const path = require('path');
var cors = require('cors')
const config = require('./config');

const userRouter = require('./router/user');
const companyRouter = require('./router/company');
const cons = require('consolidate');

const app = express();
app.use((req, res, next) => {
    console.log('adsfas')
    next()
})
app.use(cors({
    origin: ["http://localhost:3000", "http://10.1.23.30:8081"],
    credentials: true,
    methods: 'PUT,POST,GET,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, device-type, token',
    maxAge: 24 * 3600 * 1000
}))
app.use(cookieParser());//运用cookie解析的中间件
app.use(express.json());//for parsing application/json
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded

app.use('/user', userRouter);
app.use('/company', companyRouter)
console.log('app===', Object.prototype.toString.call(app))
app.listen(config.app.port, () => {
    console.log(`app listening at http://localhost:${config.app.port}`);
});

app.use(static(path.join(__dirname, 'static')))