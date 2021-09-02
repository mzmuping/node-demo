const app1 = require('./http')

// 接口1
app1.get('/getTest2', (req, res) => {
  res.status(200)
  console.log("ab*cd  请求");
  res.send("getTest2");
//   res.json(res1)
})
