
const express = require('express');
const expressStatic = require('express-static');
const mybodyParser = require('./my-body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

// var bodyParser = require('body-parser')//被弃用
// server.use(bodyParser.urlencoded({ extended: false }));
const server = express();
server.listen(8080);


const users = {
    "blue": '123456',
    "zhangsan": '123456',
    "lisi": '654321'
}
// post 请求解析
// server.use(express.json());
// server.use(express.urlencoded({
//     extended: false,
//     limit: 2 * 1024 * 1024//2m
// }));
server.use(mybodyParser);//自定义
server.use(cookieParser())
server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2', 'key3', 'key4'],
    maxAge: 1000 * 3600 * 24
}))
server.use('/login', (req, res, next) => {
    res.cookie('user', 'blue11332', { path: '/', maxAge: 10 * 3600 })
    // res.clearCookie('user');
    if (req.session['count'] == null) {
        req.session['count'] = 1
    } else {
        req.session['count']++;
    }
    console.log(req.session['count']);
    delete req.session['count']
    next();
});
server.get('/login', (req, res) => {
    let user = req.query['user']
    let pass = req.query['pass']
    if (users[user] == null) {
        res.send({ ok: false, msg: '此用户不存在' });
    } else if (users[user] !== pass) {
        res.send({ ok: false, msg: '密码错误' });
    } else {
        res.send({ ok: true, msg: '操作成功' });
    }
});

server.post('/login', (req, res) => {
    console.log(req.body)
    let user = req.body['user']
    let pass = req.body['pass']
    if (users[user] == null) {
        res.send({ ok: false, msg: '此用户不存在' });
    } else if (users[user] !== pass) {
        res.send({ ok: false, msg: '密码错误' });
    } else {
        res.send({ ok: true, msg: '操作成功' });
    }
});

server.use(expressStatic(__dirname + '/www'));//静态页面





