var elasticClient = require('./elasticClient');

module.exports = {

  addContact: function(name, phone, email) {
    elasticClient.addContact(name, phone, email)
      .then(function (res) {
        console.log('Created' + res);
      });
  },

  getContact: function(name) {
    elasticClient.getContact(name).then( function(res) {
      console.log("Number of hits: " + res.hits.total);
        res.hits.hits.forEach(function(hit){
            //console.log(hit._source.name);
            var result = {
              'name': hit._source.name,
              'phone': hit._source.phone,
              'email': hit._source.email
            };
            //returning JSON result
            return result;
          });
    })
    .catch(function (err) {
      console.log("Search failed " + err);
    });
  }

}
