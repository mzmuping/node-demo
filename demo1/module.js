var Hello = require("./hello");

var http = require("http");
var hello = new Hello();

hello.setName("kity");
console.log("ss=", hello.getName());
hello.sayHello();
