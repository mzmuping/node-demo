const jade = require('jade');
const fs = require('fs');
var str = jade.renderFile('./www/template.jade');

console.log(str);

fs.writeFile('./www/jade.html', str, (err, data) => {
    if (err)
        console.log('写入失败');
    else
        console.log('写入成功');

});