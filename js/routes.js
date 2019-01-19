// Routes
var express    = require('express');
//var bodyParser = require('bodyParser');

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// Last line
module.exports = router;
