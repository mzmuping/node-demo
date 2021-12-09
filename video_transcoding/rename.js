/**
 * 更换文件名称
 */
const fs = require('fs');
const path = require('path');
let static = path.join('E:/\其他/\易经', 'mp4');

let files = fs.readdirSync(static);//获取文件文件列表

console.log(files);

files.forEach(file => {
    let oldfile = path.join(static, file);
    let newFile = oldfile.replace(/0001.哔哩哔哩-/g, '')
    console.log(newFile);
    fs.renameSync(oldfile, newFile)
})
