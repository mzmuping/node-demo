const cons = require('consolidate');
const express = require('express');
const router = express.Router();
const query = require('../query');
const $sql = require('../sqlMap');
const { responseClient, md5 } = require('../util');

router.get('/list', (req, res) => {
    console.log(req.query);
    let page = req.query.current ? req.query.current : 1;
    let page_size = req.query.pageSize ? req.query.pageSize : 10;

    let params = [(page - 1) * page_size, +page_size]

    query($sql.lists.check, params).then(result => {
        let info = {
            total: result[0][0]['COUNT(*)'],
            lists: result[1]
        }
        responseClient(res, 200, 1, '操作成功', info)
    }).catch(err => {
        console.log(err)
        responseClient(res, 500, 3, '获取失败')
    })
});

router.post('/add', (req, res) => {

    let { deptName, distributionNetwork, address, type, planBeginTime, planEndTime, workEmployee, content } = req.body

    query($sql.lists.add, [deptName, distributionNetwork, address, type, planBeginTime, planEndTime, workEmployee, content]).then(result => {
        responseClient(res, 200, 1, '操作成功')
    }).catch(err => {
        console.log(err)
        responseClient(res, 500, 3, "插入失败")
    })
});


router.post('/delete', (req, res) => {

    let { ids } = req.body

    query($sql.lists.delete, [ids]).then(result => {
        console.log(result);
        responseClient(res, 200, 1, '操作成功')
    }).catch(err => {
        console.log(err)
        responseClient(res, 200, 3, "插入失败")
    })
});


router.post('/update', (req, res) => {

    let { deptName, distributionNetwork, address, type, planBeginTime, planEndTime, workEmployee, content } = req.body
    console.log('====', req.body)
    let { id } = req.body
    delete req.body.id
    console.log(req.body, '====', req.body)
    fields = getFields(req.body)
    console.log(fields)
    let sqlStr = $sql.lists.update.replace(/\?/, fields.fields)
    console.log(sqlStr);
    // responseClient(res, 200, 1, '操作成功')
    query(sqlStr, [...fields.args, id]).then(result => {
        responseClient(res, 200, 1, '操作成功')
    }).catch(err => {
        console.log(err)
        responseClient(res, 200, 3, "插入失败")
    })
});
function getFields(fields) {
    var info = { args: [] };
    var f = '';
    if (fields) {
        for (var key in fields) {
            f += key + " = ? ,";
            info.args.push(fields[key]);
        }
    }
    info.fields = f.substring(0, f.length - 2);
    return info;
};


module.exports = router