const Express = require('express')

const app = new Express();
let student = [
    { id: 1, name: 'jack', age: 12 },
    { id: 2, name: 'mark', age: 16 },
    { id: 3, name: '周周', age: 18 },
    { id: 4, name: '丽丽', age: 18 },
]
app.use((req, res, next) => {
    console.log('有请求了')
    console.log(req.url)
    next()
})
app.get('/', (req, res) => {
    res.send({})
})
app.get('/student', (req, res) => {
    res.send(student)
})

app.listen(8080, () => {
    console.log('服务器：http:localhost:8080')
})