const express = require('express');
const static = require('express-static');
const cookie = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const jade = require('jade');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const http = require('http');
const https = require('https');
const fs = require('fs');
const pathLib = require('path')
const consolidate = require('consolidate');
const mysql = require('mysql');
const userRouter = express.Router()
const authRouter = express.Router()

//连接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a123456',
    database: '20210911',
    // port:''//默认3306 不需要填
});

db.connect();
db.query('select * from users_table where ID = 1', (err, data) => {
    if (err) {
        console.log('查询错误', err.toString());
    } else {
        console.log('查询成功', JSON.stringify(data));
    }
});
db.query("INSERT INTO `users_table` (`ID`,`username`,`PASSWORD`) VALUES(0,'sf','123')", (err, data) => {
    if (err) {
        console.log('插入错误', err.toString());
    } else {
        console.log('插入成功', JSON.stringify(data));
    }
});
db.end();

const server = express();
server.listen(8080, () => {
    console.log('服务器：http://localhost:8080');
});


//1.解析cookie 
server.use(cookieParser('sfadfsadfasfsafsdf'));

//2.使用session
let keys = []
for (let i = 0; i < 20; i++) {
    keys.push('keys_' + i + Math.random());
}
server.use(cookieSession({ name: 'zns_sess_id', keys: keys, maxAge: 24 * 3600 * 1000 }))

//3.post 数据
server.use(bodyParser.urlencoded({ extended: false }))
server.use(multer({ dest: './www/uploads' }).any())

//模板引擎
//
server.engine('html', consolidate.ejs)
server.set('view engine', 'html');
server.set('views', __dirname + '/views');


//用户请求
server.use('/', (req, res, next) => {
    console.log(req.query, req.files, req.body, req.cookies)
    next()
})

//转换图片
server.use('/transformImg', (req, res) => {
    let picUrl = req.query.picUrl;
    https.get(picUrl, (resonse) => {
        //data 存储图片数据，是二进制流 
        var data = "";
        // 一定要设置encode，否则即使在pic/downImg/中有1.jpg,也是无法显示的
        resonse.setEncoding("binary")
        // 当数据到达时会触发data事件
        resonse.on('data', function (chunk) {
            data += chunk;
        });
        // 当数据接收完毕之后，会触发end事件
        resonse.on("end", function () {

            // 用fs模块，读取到的图片，放到pic/downImg下，命名为1.jpg
            // 这里要注意pic和downImg文件夹事先要存在，否则会报错
            let picName = pathLib.parse(picUrl).base;

            fs.writeFile('./www/uploads/' + picName, data, 'binary', (err) => {
                if (err) {
                    res.write('error: ' + err.toString())
                    res.end()
                } else {
                    fs.readFile('./www/uploads/' + picName, function (err, data) {
                        if (err) {
                            res.write('error')
                        } else {
                            // Content-Type的值一定要和返回数据的类型相匹配，否则浏览器是不能正确解析数据的
                            res.writeHead(200, { "Content-Type": "image/jpeg" })
                            res.write(data)
                        }
                        res.end() // 如果end，浏览器会有警告，提醒你请求未结束
                    })
                } // getPic的作用是把图片返回给浏览器
            })
        });
    }).on("error", function () {
        console.log('error')
    });

})

//路由使用
server.use('/users', userRouter)
server.use('/auth', authRouter)


userRouter.get('/', (req, res) => {
    res.send('user/');
});

userRouter.get('/list', (req, res) => {
    res.send('user/list');
});

authRouter.get('/', (req, res) => {
    res.send('auth/');
});

authRouter.get('/list', (req, res) => {
    res.send('auth/list');
});


//4.static 数据
// server.use(static(__dirname, './www'))
server.use('/s', express.static('views'))

