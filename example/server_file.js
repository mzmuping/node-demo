const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');
const cors = require('cors');


const server = express();
server.use(cors({
    origin: ["http://localhost:3000", "http://10.1.23.30:8081", "http://localhost:8080",],
    credentials: true,
    methods: 'PUT,POST,GET,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, device-type , token',
    maxAge: 24 * 3600 * 1000
}))
server.use(bodyParser.urlencoded({ extended: false }));
const upload = multer({ dest: pathLib.join(__dirname, 'www/uploads/') })
// 
server.use(upload.any());

server.post('/upload', (req, res, next) => {
    console.log('felis===', req.files);
    let files = req.files[0]
    let fileName = files.path + pathLib.parse(files.originalname).ext;
    fs.rename(files.path, fileName, (err) => {
        if (err) {
            res.send('上传失败');
        } else {
            res.send('上传成功');

        }
    })

})
server.listen(8081, () => {
    console.log('启动成功 %s', `http://localhost:8081`)
})
server.use(express.static(pathLib.join(__dirname, 'www')))

server.use('/s', express.static(pathLib.join(__dirname, 'views')))