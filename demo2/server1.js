const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const urlLib = require('url');

const host = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {

    let obj = urlLib.parse(req.url, true)
    let url = obj.pathname;
    let GET = obj.query;

    let str = '';
    let i = 0;
    req.on('data', (data) => {
        str += data
        console.log(i++);
    })

    req.on('end', () => {
        const POST = querystring.parse(str)
        console.log('POST', POST);
    })

    console.log('GET', GET)

    let fileName = './www/' + url;

    fs.readFile(fileName, (err, data) => {
        res.statusCode = 200;
        if (err) {
            res.write('404')
        } else {
            res.write(data)
        }
        res.end();
    })


})

server.listen(port, host, () => {
    console.log(`服务启动：http://${host}:${port}`)
})