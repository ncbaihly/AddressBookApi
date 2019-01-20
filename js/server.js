// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var config = require('../config.json');
var routes = require('./routes.js');
var elasticClient = require('./elasticClient');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

var port = process.env.PORT || config.apiPort;

var indexExists = elasticClient.indexExists()
  .then( function(res) {
    console.log("Index Exists: " + res);
    if(res == false){
      elasticClient.initIndex().then( function(res) {
        console.log("Index created " + res);
      }).catch( function(err) {
        console.log("Index Creation failed: " + err);
      })
    }
  });

console.log(indexExists);

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);
