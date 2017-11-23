var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/lottery';

 MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    db.collection('lotodb').drop();
   
    var doc = {"name":"yui"};
   
    db.collection('lotodb').insert(doc, function(err, inserted){
        if(err) throw err;
        console.dir("Successfully inserted:"+JSON.stringify(inserted));
        return db.close();
    });
});
