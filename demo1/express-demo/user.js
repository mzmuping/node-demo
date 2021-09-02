const express = require("express");
const router = express.Router();
const Mongodb = require("./mongodb");
const querystring = require("querystring");
const { json } = require("express");
const { parse } = require("path");

let result = {
  code: 1,
  data: null,
  mes: "成功",
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// 添加
router.post("/addUser", function (req, res) {
  let thatRes = res;
  let data = "";
  req.on("data", (chunk) => {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk;
  });

  req.on("end", (chunk) => {
    // （1）.对url进行解码（url会对中文进行编码）
    data = decodeURI(data);
    console.log(data);
    //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
    //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
    var dataObject = JSON.parse(data);

    Mongodb.MongoClient.connect(
      Mongodb.MongoUrl,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        // var myobj = { name: dataObject.name, url: dataObject.url };
        dbo.collection("site").insertOne(dataObject, function (err, res) {
          if (err) throw err;
          db.close();
          thatRes.send(result);
        });
      }
    );
  });
});

// 更新数据
router.put("/updateUser", function (req, res) {
  let thatRes = res;
  let data = "";
  req.on("data", (chunk) => {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk;
  });

  req.on("end", (chunk) => {
    // （1）.对url进行解码（url会对中文进行编码）
    data = JSON.parse(decodeURI(data));
    console.log(data, typeof data);
    Mongodb.MongoClient.connect(
      Mongodb.MongoUrl,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = { name: data._id }; // 查询条件
        var updateStr = { $set: { name: data.name, url: data.url } };
        console.log(whereStr);
        dbo
          .collection("site")
          .updateMany(whereStr, updateStr, function (err, res) {
            if (err) throw err;
            console.log("文档更新成功1");
            db.close();
            thatRes.send(result);
          });
      }
    );
  });
});

// 删除数据
router.put("/deleteUser", function (req, res) {
  let thatRes = res;
  let data = "";
  req.on("data", (chunk) => {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk;
  });

  req.on("end", (chunk) => {
    // （1）.对url进行解码（url会对中文进行编码）
    data = JSON.parse(decodeURI(data));
    console.log(data, typeof data);
    Mongodb.MongoClient.connect(
      Mongodb.MongoUrl,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = { name: data.name }; // 查询条件

        dbo.collection("site").deleteMany(whereStr, function (err, res) {
          if (err) throw err;
          console.log("文档更新成功1");
          db.close();
          thatRes.send(result);
        });
      }
    );
  });
});
//获取列表
router.get("/list_user", function (req, res) {
  Mongodb.MongoClient.connect(
    Mongodb.MongoUrl,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("runoob");
      dbo
        .collection("site")
        .find({})
        .toArray(function (err, result) {
          // 返回集合中所有数据
          if (err) throw err;
          db.close();
          res.send({
            code: 1,
            data: result,
            mes: "成功",
          });
        });
    }
  );
});

module.exports = router;
