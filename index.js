var express = require('express'),
    frontendDebug = require('./modules/frontendDebug'),
    bodyParser  = require('body-parser'),
    app = express();

app.use(bodyParser());


app.use(express.static(__dirname + '/views'));
app.route('/message').post(frontendDebug);
app.route('/script.js').post(express.static(__dirname + '/views/js/hipchatDebug.js'));


app.listen(3000);




