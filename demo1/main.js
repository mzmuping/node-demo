var fs = require("fs");
// 阻塞
var data = fs.readFileSync("input.txt");
console.log(data.toString());
console.log("程序执行结束!");

// 非阻塞
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
