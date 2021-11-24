const cons = require('consolidate');
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const { mysql } = require('../config')
const { responseClient } = require('../util');
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: 'localhost',
    dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});


const Company = sequelize.define('User', {
    // 在这里定义模型属性
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    sequelize,
    timestamps: false,
    // tableName: 'company_table'
});

router.get('/list', async (req, res) => {
    console.log('sequelize====', Company, sequelize.models); // true
    const data = await Company.findAll()

    responseClient(res, 200, 1, '操作成功', data)
})

module.exports = router