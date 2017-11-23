var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/lottery';

MongoClient.connect(url, function(err, db) {
  db.collection("data").find({"day":"16 ตุลาคม 2559"}).toArray(function(err, result) {
    if(result.length == 0){
        console.log("not found date");
    }else{
        console.log(result.length);
    }
  });
});
