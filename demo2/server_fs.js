const http = require('http');
const fs = require('fs');

const option = {
    host: '127.0.0.1',
    port: 8080,
}

const server = http.createServer((req, res) => {
    let fileName = `./www/${req.url}`;
    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.write('404');
        } else {
            res.write(data)
        }
        res.end();
    })
})

server.listen(option, () => {
    console.log(`服务启动：http://${option.host}:${option.port}`);
});

