const express = require('express');
const router = express.Router();
// const mysql = require('../db');
const $sql = require('../sqlMap');
const { responseClient, md5 } = require('../util');
const query = require('../query');


router.post('/login', (req, res) => {

    let { userName, password } = req.body;
    password = md5(password)
    query($sql.user.check, [userName, password]).then((results) => {

        if (results.length === 0) {
            return responseClient(res, 200, 0, '账号错误或者密码错误')
        }
        responseClient(res, 200, 1, '操作成功', {
            userName: results[0].userName
        })
    }).catch(err => {
        console.log('err', err);
        return responseClient(res, 200, 0, '连接数据库失败')
    })

})

router.post('/register', async (req, res) => {

    let { userName, password, email, phone } = req.body;

    password = md5(password)
    let checkRepeat = await query($sql.user.checkRepeat, [userName])
    if (checkRepeat.length > 0) {
        return responseClient(res, 200, 0, '已经存在该用户了')
    }
    query($sql.user.add, [userName, password, email, phone]).then((results) => {

        if (results.length === 0) {
            return responseClient(res, 200, 0, '插入失败')
        }
        responseClient(res, 200, 1, '操作成功')
    }).catch(err => {
        console.log('err', err);
        return responseClient(res, 200, 0, '连接数据库失败')
    })

})

module.exports = router