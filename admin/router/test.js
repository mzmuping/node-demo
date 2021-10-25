const express = require('../middleware/express')

const app = new express();
app.use((req, res, next) => {
    next();

})

app.get('/test', (req, res, next) => {
    console.log('req test');
    next()
})

app.get('/test', (req, res, next) => {
    console.log('请求结束');
    res.end('sfd');
})

app.listen(9000, () => {
    console.log(`app listening at http://localhost:9000`);

})

var server = function(){
    server.handle()
}