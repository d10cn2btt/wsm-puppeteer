let express = require('express');
let app = express();
var bodyParser = require('body-parser');

let PORT = process.env.PORT || 3000;
let middleware = require('./middleware');
let wsm = require('./wsm');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/check_il_le', async function (req, res) {
    let dateResponse = "";
    await wsm.checkDate(req.body.email, req.body.password).then(function (value) {
        res.status(value.status_code).json(value.res_content);
    });
});

app.post('/submit_form_request', async function (req, res) {
    let dateResponse = "";
    await wsm.submitFormRequest(req).then(function (value) {
        res.status(value.status_code).json(value.res_content);
    });
});

app.post('/take_IL1', function (req, res) {
    console.log(req);
    res.status(200).json({
        "day_IL": ['2017-02-13 07:50', '2017-02-21 08:50', '2017-02-23 08:50'],
        "day_LE": ['2017-02-03 15:40', '2017-02-08 14:40'],
    });
});

app.get('/hehe', function (req, res) {
    res.json({
        'acvvbc': 123,
        'def': 222,
    });
});

app.listen(PORT, function () {
    console.log('Express server started on port ' + PORT + '!');
});
