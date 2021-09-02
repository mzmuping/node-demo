var http = require("http");
var url = require("url");
var util = require("util");
var querystring = require("querystring");

var postHTML = `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
    <form method="post">
    网站名： <input name="name"><br>
    网站 URL： <input name="url"><br>
    <input type="submit">
    </form>
    </body>
  </html>
  `;
http
  .createServer(function (req, res) {
    // res.writeHead(200, {
    //   "Content-Type": "text/plain;charset=utf-8",
    // });

    /**
     * get
     */
    // let params = url.parse(req.url, true).query;
    // res.write("网站名：" + params.name);
    // res.write("\n");
    // res.write("网站 URL：" + params.url);
    // res.end();

    /**
     * post
     */
    var body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      body = querystring.parse(body);
      res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
      if (body.name && body.url) {
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URl:" + body.url);
      } else {
        res.write(postHTML);
      }
      res.end();
    });
  })
  .listen(3000);
console.log("server on http://127.0.0.1:3000/");
