// Routes
var express    = require('express');
var router = express.Router();              // get an instance of the express Router
var elasticClient = require('./elasticClient');
var contactManager = require('./contactManager');
// test route to make sure Datastore is up and
// server is routing (accessed at GET http://localhost:8080/ by default)
router.get('/', function(req, res) {
  elasticClient.ping(req, res);
});


// GET /contact?pageSize&page&query
// to search all
router.get('/contact', function (req, res){
    var pageSize = req.query.pageSize;
    var page = req.query.page;
    var query = req.query.query;

    if(!pageSize || !page || !query) {
      res.send("Missing parameters, please try again");
    } else {
      res.send(pageSize + ' ' + page + ' ' + query );
    }
  });

  // POST create new contact if the name doesn't exist in another contact
  router.post("/contact", function(req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;

    contactManager.getContact(name).then(function (result) {
      if (!result) {
        contactManager.addContact(name, phone, email).then( function(result){
          res.send('Created');
        }).catch( function(err) {
          console.log("Creation failed");
        });
      }
    }).catch(function (err) {
      console.log("Search Failed");
    });
  });

router.route('/contact/:name')
  .get(function(req, res) {
    // TODO query ElasticSearch Datastore
    // TODO build response
    //res.json({ message: "active API endpoint" });

    contactManager.getContact(req.params.name).then( function(result) {
      console.log("GET contact route reslove" + result);
      res.json(result);
    })

  })
  .put(function(req, res){
    res.json({ message: "PUT not implemented" });
  })
  .delete(function(req, res) {
    res.json({ message: "DELETE not implemented" });
  });




// Last line
module.exports = router;
