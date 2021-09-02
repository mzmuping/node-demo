var http = require("http");
var fs = require("fs");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("request for " + pathname + " received");

    route(pathname);
    let body = fs.readFileSync("./index.html", "utf8");

    response.writeHead(200, { "Content-type": "text/html" });
    response.write(body);
    response.end();
  }

  http.createServer(onRequest).listen(8888);

  console.log("Server running at http://127.0.0.1:8888/");
}

exports.start = start;
