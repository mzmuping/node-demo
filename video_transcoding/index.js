const fs = require('fs');
const path = require('path');
var FfmpegCommand = require('fluent-ffmpeg');
const cons = require('consolidate');
let regArr = ['.flv', '.avi', '.mp4']
let tran_dir = 'mp4'
let static = path.join('E:/\其他/\易经');
let save_dir = path.join(static, tran_dir)

fs.stat(save_dir, (err, stats) => {
    if (err) {
        fs.mkdir(save_dir, (err) => {
            console.log(err);
            // => [Error: EPERM: operation not permitted, mkdir 'C:\']
        })
    } else {
        console.log(stats.isDirectory());
    }
})

let files = fs.readdirSync(static);//获取文件文件列表
console.log(files.length)
fmpeg_save(files[0], 0);
/**
 * 逐个转换文件
 * @param {*} file  文件路径
 * @param {*} index 转换第几个
 * @returns 
 */
async function fmpeg_save(file, index) {
    let fileparse = path.parse(file);
    let file_url = path.join(static, file);
    let saveFile = path.join(save_dir, `${fileparse.name}.${tran_dir}`)
    console.log(file_url, saveFile);
    let statSync = await fs.statSync(saveFile, { throwIfNoEntry: false })
    index = index + 1;
    if (index > files.length) return
    if (statSync && statSync.isFile()) {
        fmpeg_save(files[index], index);
        return
    }

    if (regArr.includes(fileparse.ext.toLowerCase())) {
        console.time('计时器1')
        var command = new FfmpegCommand(file_url)
            // .videoCodec('mjpeg')//avi
            .videoCodec('libx264')//mp4
            .format(tran_dir)
            .on('progress', function (info) {
                console.log('progress ' + info.percent + '%');
            })
            .on('end', function () {
                console.log('files have been merged succesfully');
                console.timeEnd('计时器1')
                console.log(`解压了到%c ${index}个`, 'color:red')
                fmpeg_save(files[index], index);
            })
            .on('error', function (err) {
                console.log('an error happened: ' + err.message);
            })
            .save(saveFile);
    }

}
