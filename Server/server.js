let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
let middleware = require('./middleware');
let wsm = require('./wsm');

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, async function (req, res) {
    let xxx = "";
    await wsm().then(function (value) {
        xxx = value;
    });

    await res.json(xxx);
});

app.use(express.static(__dirname + '/public'));
app.listen(PORT, function () {
    console.log('Express server started on port ' + PORT + '!');
});
