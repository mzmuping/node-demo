var express = require("express");
var app = express();

var birds = require("./user");

app.all("*", (req, res, next) => {
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, device-type"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/users", birds);

var server = app.listen(8081, "0.0.0.0", function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(host + port);
  console.log("应用实例，访问地址为 http://127.0.0.1:" + port);
});
