const crypto = require('crypto');
const md5_suffix = 'sfswere345sfsfwerwerwersdfagadfadfa#$#$$#$$$#$$$$erwrwersfadfadfadfaf'
let content = '123456' + md5_suffix;
let result = crypto.createHash('md5').update(content).digest('hex');

console.log(result);

