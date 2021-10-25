const express = require('express');
const router = express.Router();
const mysql = require('../lib/db').connection;
const md5 = require('../lib/md5').md5;

router.use((req, res, next) => {
    console.log('admin_id', req.session['admin_id']);
    if (!req.session['admin_id'] && req.url !== '/login') {
        res.redirect('/admin/login');
    } else {
        next();

    }
})
router.get('/login', function (req, res) {
    res.render('login.ejs', {
        title: 'Consolidate.js',
        lists: [{
            name: '123'
        }, {
            name: '123'
        }, {
            name: '123'
        }]
    });
});
router.post('/login', (req, res) => {

    let { username, password } = req.body;
    password = md5(password);
    mysql.query(`SELECT * FROM user_table where username='${username}'`, (err, data) => {
        if (err) {

            res.status(500).send('数据库报错').end();
            return;
        } else {
            if (data.length === 0) {
                res.status(400).send('no this admin ').end();
            } else {

                if (password == data[0].password) {
                    req.session['admin_id'] = data[0].ID
                    console.log(req.session['admin_id']);

                    // res.status(200).send('恭喜成功了').end();
                    res.redirect('/admin');
                } else {
                    res.status(404).send('密码错误').end();;
                }
            }

        }
    })

})

module.exports = {
    router
}