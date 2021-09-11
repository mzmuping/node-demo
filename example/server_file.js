const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');


const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
const upload = multer({ dest: './www/uploads/' })
// 
server.use(upload.any());
server.post('/', (req, res, next) => {
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
server.listen(8081)
