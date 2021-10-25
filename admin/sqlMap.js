let sqlMap = {
    lists: {
        check: 'select COUNT(*) from company_table;select * from company_table order by id desc limit ?,?',
        add: 'insert into company_table(deptName,distributionNetwork,address,type,planBeginTime,planEndTime,workEmployee,content) values(?,?,?,?,?,?,?,?)',
        delete: 'delete from company_table where id in (?)',
        update: 'update company_table set ? where id = ?',

    },
    user: {
        add: 'insert into users(userName,password,email,phone) values(?,?,?,?)',
        check: 'select * from users where userName=? and password=?',
        checkRepeat: 'select * from users where userName=? ',
    }
}


module.exports = sqlMap;

