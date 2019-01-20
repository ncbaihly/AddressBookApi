// Elastic Search Layer
var config = require('../config.json');
var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host: config.elasticSearchHost,
  log: 'trace'
});

module.exports = {
  ping: function(req, res){
		elasticClient.ping({
		  	requestTimeout: 30000,
		}, function (error) {
			if (error) {
				res.status(500)
			    return res.json({status: false, msg: 'Elasticsearch cluster is down!'})
			} else {
			    res.status(200);
			    return res.json({status: true, msg: 'Success! Elasticsearch cluster is up!'})
			}
		});
	},

  /**
* create the index
*/
initIndex: function() {
    return elasticClient.indices.create({
        index: config.indexName
    });
},

/**
* check if the index exists
*/
indexExists: function() {
    return elasticClient.indices.exists({
        index: config.indexName
    });
},

initMapping: function() {
    return elasticClient.indices.putMapping({
        index: config.indexName,
        type: "contact",
        body: {
            properties: {
                name: { type: "string" },
                phone: { type: "string" },
                email: { type: "string"},
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
                }
            }
        }
    });
},

addContact: function(name, phone, email) {
    return elasticClient.index({
        index: config.indexName,
        type: "contact",
        body: {
            name: name,
            phone: phone,
            email: email,
            suggest: {
                input: name.split(" "),
                output: name,
            }
        }
    });
},

// using search like this because I couldn't figure out how to get
// a single result  without using //
// I was going to handle data validity testing in contactManager
getContact: function(name) {
  return elasticClient.search({
    index: config.indexName,
    q: 'name:' + name
  });
}



};
