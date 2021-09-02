const fs = require("fs");
const zlib = require("zlib");
var data = "";

//创建可读流
var readerStream = fs.createReadStream("input.txt");

// 设置编码
readerStream.setEncoding("UTF8");

readerStream.on("data", function (chunk) {
  console.log("chunk", chunk, "data", data);
  data += chunk;
});

readerStream.on("end", function (chunk) {
  console.log("end", chunk);
  console.log(data);
});

readerStream.on("error", function (chunk) {
  console.log("error", chunk);
});

readerStream.on("finish ", function (chunk) {
  console.log("finish ", chunk);
});

// console.log("程序执行完毕");

var writeStream = fs.createWriteStream("output.txt");

writeStream.write("data", "utf8");
writeStream.end();

writeStream.on("finish", function () {
  console.log("写入完成。");
});

writeStream.on("error", function (error) {
  console.log(error);
});

// console.log("程序执行完毕");

// 管道流
var readerStream2 = fs.createReadStream("input.txt");
var writeStream2 = fs.createWriteStream("outpipe.txt");

readerStream2.pipe(writeStream2);

// 链式流
// fs.createReadStream("input.txt")
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream("input.txt.gz"));

// console.log("文件压缩完成。");

//
fs.createReadStream("input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("input1.txt"));

console.log("文件解压完成。");
