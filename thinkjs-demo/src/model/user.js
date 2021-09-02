"use strict"; // src/model/user.js

module.exports = class extends think.Mongo {
  getList() {
    return this.field('site').select();
  }

};
//# sourceMappingURL=user.js.map