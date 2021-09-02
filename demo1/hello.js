function Hello() {
  let name;
  this.setName = function (name) {
    this.name = name;
  };

  this.getName = function () {
    return this.name;
  };

  this.sayHello = function () {
    console.log("hello, " + this.name);
  };
}

module.exports = Hello;
