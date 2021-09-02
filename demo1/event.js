var events = require("events");

var eventEmitter = new events.EventEmitter();

var connectHandle = (err, data) => {
  console.log("发送成功");
  console.log(err, data);
  //   触发接受器
  eventEmitter.emit("data_received");
};

eventEmitter.on("connection", connectHandle);

let listener1 = () => {
  console.log("接受成功");
};
let listener2 = () => {
  console.log("接受成功");
};
eventEmitter.on("data_received", () => {
  console.log("接受成功");
});
eventEmitter.on("data_received", () => {
  console.log("接受成功123");
});
// 触发 发送
eventEmitter.emit("connection");
var eventListeners = eventEmitter.listenerCount("data_received");
console.log(eventListeners + "个监听器监听连接事件。");
eventEmitter.removeListener("data_received", () => {
  console.log("12323");
});
eventListeners = eventEmitter.listenerCount("data_received");

console.log(eventListeners + "个监听器监听连接事件。");
eventEmitter.emit("data_received");

console.log("程序成功");
