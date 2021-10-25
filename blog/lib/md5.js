const crypto = require('crypto');
const MD5SUFFIX = 'sfswere345sfsfwerwerwersdfagadfadfa#$#$$#$$$#$$$$erwrwersfadfadfadfaf';

module.exports = {
    md5: (cont) => {
        let str = cont + MD5SUFFIX;
        let hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');
    }
}