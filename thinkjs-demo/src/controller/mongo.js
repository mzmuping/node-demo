"use strict";
/* eslint-disable no-console */

const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    console.log(this.method);
    const user = this.mongo('site'); // controller 里实例化模型

    const data = await user.select();
    return this.success(data);
  }

};
//# sourceMappingURL=mongo.js.map