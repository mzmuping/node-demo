const jade = require('ejs');

var str = jade.renderFile('./www/ejs.ejs', { name: 'blue' }, {}, function (err, data) {
    if (err) {
        console.log('编译失败');
    } else {
        console.log('编译成功', data);

    }
});

console.log(str);