// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var config = require('../config.json');
var routes = require('./routes.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
//.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(require('./routes'));

var port = process.env.PORT || config.apiPort;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
