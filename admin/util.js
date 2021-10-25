const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: 'sdlfasldfdflsadfkl世纪东方垃圾阿斯顿发了就多放拉大锯*(*(*(()*',
    md5: function (pwd) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    },
    responseClient(res, httpCode = 500, code = 3, msg = '服务端异常', data = {}) {
        /**
         * res： 请求response
         * code 值：
         * 0：失败
         * 1：成功
         * 2：数据不合法
         * 3：客户端数据错误
         * 4：后端错误
        */
        let resData = {
            status: code,
            data: data,
            message: msg
        }

        res.status(httpCode).json(resData)
    }
}