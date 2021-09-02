"use strict";
/* eslint-disable no-console */

module.exports = class extends think.Controller {
  __before() {
    // 跨域处理
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-with');
    this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', 'true');
  }

  __call() {
    const method = this.http.method.toLowerCase();

    if (method === 'options') {
      this.setCorsHeader();
      this.end();
      return;
    }

    this.setCorsHeader();
    return super.__call();
  }

  setCorsHeader() {
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-with');
    this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', 'true');
  }

};
//# sourceMappingURL=base.js.map