var express = require('express'),
    frontendDebug = require('./modules/frontendDebug'),
    bodyParser  = require('body-parser'),
    app = express();

app.use(bodyParser());


app.use(express.static(__dirname + '/views'));
app.route('/message').post(frontendDebug);


app.listen(3000);




