var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var fs = require('fs');
var db;

//Connect Database
var url = 'mongodb://localhost:27017/lottery';
MongoClient.connect(url, function(err, database) {
    if(err) { 
        throw err
    }else{
        db = database;
        console.log('Connected Successful !!');
        app.listen(3000);
    } 
});

//insert







/* --------------------------------------------------------------------------------- */
// Insert Data with Node.js
// Insert a Document
/* --------------------------------------------------------------------------------- */
// var insertDocument = function(db, callback) {
//     db.collection('test').insertOne( {
    //    "address" : {
    //       "street" : "2 Avenue",
    //       "zipcode" : "10075",
    //       "building" : "1480",
    //       "coord" : [ -73.9557413, 40.7720266 ]
    //    },
    //    "borough" : "Manhattan",
    //    "cuisine" : "Italian",
    //    "grades" : [
    //       {
    //          "date" : new Date("2014-10-01T00:00:00Z"),
    //          "grade" : "A",
    //          "score" : 11
    //       },
    //       {
    //          "date" : new Date("2014-01-16T00:00:00Z"),
    //          "grade" : "B",
    //          "score" : 17
    //       }
    //    ],
    //    "name" : "Vella",
    //    "restaurant_id" : "41704620"
//     }, function(err, result) {
//      assert.equal(err, null);
//      console.log("Inserted a document into the restaurants collection.");
//      callback();
//    });
//  };

//  MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     insertDocument(db, function() {
//         db.close();
//     });
//   });




/* --------------------------------------------------------------------------------- */
// Remove
/* --------------------------------------------------------------------------------- */
// var removetest = function(db, callback) {
//     db.collection('test').deleteMany({},function(err, results) {
//           console.log(results);
//           callback();
//        }
//     );
//  };

//  MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
  
//     removetest(db, function() {
//         db.close();
//     });
//   });





/* --------------------------------------------------------------------------------- */
  //Droup Collection
/* --------------------------------------------------------------------------------- */
//   var droptest = function(db, callback) {
//     db.collection('test').drop( function(err, response) {
//        console.log(response)
//        callback();
//     });
//  };

//  MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
  
//     droptest(db, function() {
//         db.close();
//     });
//   });

















// const mongoose = require('mongoose');
// const express = require('express');
// var app = express();
// var Schema = mongoose.Schema;

// //Connect to mongodb
// mongoose.connect('mongodb://localhost/lotterydb');

// mongoose.connection.once('open', function(){
//     //เตรียมการใช้งาน
//     //mongoose.set('debug',config.debug);
//     console.log('Connected');
// }).on('err', function(error){
//     console.log('Connection error', error);
// });

// //กำหนด Schema
// var LotSchema = new Schema({
//     prize: String,
//     lottery: String,
//     money: Number
// });
// //สร้าง Model
// mongoose.model('User', LotSchema);

/*---------------------------------------------------------------------------------- */

// //Retrieve
// var MongoClient = require('mongodb').MongoClient,format = require('util').format;

// //Connect to DB
// MongoClient.connect("mongodb://localhost:27017/lotterydb", function(err, db){
//     if(!err){
//         console.log("Connect Successful!!");
//     }else{
//         console.log('Disconnect ERROR!!');
//     }

//     db.close();
// });
/* ----------------------------------------------------------------------------- */
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var mongo = require('./config/mongo');
// var express = require('./config/express');

// var db = mongo(); //return mongo.connect(config.mongoUri);
// var app = express();
// app.listen(3000);

// module.exports = app;

// console.log('Server running at http://localhost:3000');
    