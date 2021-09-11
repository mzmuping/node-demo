const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const URLSearchParams = urlLib.URLSearchParams;

const users = {};//{用户名:密码}

const server = http.createServer((req, res) => {

    let str = ''
    req.on('data', (data) => {
        str += data;
    })

    req.on('end', () => {
        const obj = urlLib.parse(req.url, true);
        const urlName = obj.pathname;
        const getQuery = obj.query;
        const postQuery = new URLSearchParams(str)
        console.log(postQuery, postQuery.get('act'))
        if (urlName == '/user') {      //接口
            // res.statusCode = 500;
            switch (getQuery.act) {
                case 'reg':
                    //注册
                    if (users[getQuery.user]) {
                        res.write('{ok:false,msg:"该用户已经注册"}');
                    } else {
                        users[getQuery.user] = getQuery.pwd
                        res.write('{ok:true,msg:"注册成功"}');
                    }
                    break;
                case 'login':
                    //登录
                    console.log(users[getQuery.user] !== getQuery.pwd)
                    if (users[getQuery.user] == null) {
                        res.write('{ok:false,msg:"用户不存在"}');
                    } else if (users[getQuery.user] !== getQuery.pwd) {
                        res.write('{ok:false,msg:"账号或密码错误"}');

                    } else {
                        res.write('{ok:true,msg:"登录成功"}');
                    }
                    break;
                default:
                    res.write('{ok:false,msg:"未知act"}');
                    break
            }

            res.end();


        } else {    //文件
            let pathname = './www' + urlName
            fs.readFile(pathname, (err, data) => {
                if (err) {
                    res.write('404')
                } else {
                    res.write(data)
                }
                res.end();
            });
        }

    })

})

server.listen(8080, () => {
    console.log(`服务器：http://localhost:8080`);
})