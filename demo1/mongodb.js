const app = require('./http')

// mogodb 
app.get('/add_mongo', (req, res) => {
  res.status(200)
  console.log("ab*cd  请求");
  res.send("正则匹配");
//   res.json(res1)
})
