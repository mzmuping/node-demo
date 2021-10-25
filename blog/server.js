const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
// const bodyParser = require('body-parser');

const { getKeys } = require('./utils/session')
const adminRouter = require('./router/admin');

const app = express();

app.listen(8080, (err) => {
    console.log(err);
    console.log('服务：http://localhost:8080');
});

// create application/json parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieParser('sfsdfwersdfglfjasdl'));
app.use(cookieSession({
    name: 'session_id',
    keys: getKeys(),
    maxAge: 2 * 3600 * 8
}));

//模板引擎
//
app.engine('html', consolidate.ejs)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use('/admin', adminRouter.router)

// app.get('/', function (req, res) {
//     res.render('login.ejs', {
//         title: 'Consolidate.js',
//         lists: [{
//             name: '123'
//         }, {
//             name: '123'
//         }, {
//             name: '123'
//         }]
//     });
// });


app.use(static(__dirname, './static'));