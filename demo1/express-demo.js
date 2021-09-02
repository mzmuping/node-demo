const { json } = require("express");
var express = require("express");
var app = express();
var fs = require("fs");

// 静态资料
app.use("/public", express.static("public"));

// 数据库
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

// // 解决跨域问题
app.all("*", function (req, res, next) {
  console.log('解决跨域问题');
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, device-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/", function (req, res) {
  res.send("hello Get");
});

app.post("/", function (req, res) {
  console.log("主页 post 请求");
  res.send("Hello Post");
});

app.get("/del_user", function (req, res) {
  console.log("del_user  请求");
  res.send("删除页面");
});

app.get("/list_user", function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("runoob").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
  });

  console.log("list_user  请求");
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
  
    res.send({
      code:1,
      data:JSON.parse(data),
      msg:''
    });
  });
});


//添加的新用户数据
var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

app.get("/addUser", function (req, res) {
  console.log("addUser  请求");
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    Object.assign(data, user);
    res.send(JSON.stringify(data));
  });
});

app.get("/deleteUser/:id", function (req, res) {
  console.log("获取用户详情  请求");
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    console.log(req.params);
    delete data["user" + req.params.id];
    res.send(JSON.stringify(data));
  });
});

app.get("/ab*cd", function (req, res) {
  console.log("ab*cd  请求");
  res.send("正则匹配");
});

var server = app.listen(8081, "0.0.0.0", function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(host + port);
  console.log("应用实例，访问地址为 http://127.0.0.1:" + port);
});

module.exports = app