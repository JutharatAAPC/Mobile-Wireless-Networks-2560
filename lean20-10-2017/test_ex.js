var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//app.use(bodyParser.urlencoded(add))

//----------Post---------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.post('/',function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  console.log(req.body.id);
})

//----------get-------------
 /*app.get('/',function (req, res) {
  //res.setHeader('Content-Type', 'text/plain')
   console.log(req.query.id);
 })

 var express = require('express')
 var app = express()

 app.get('/',function(req,res){
   res.send('Hello');
 })

 app.get('/test',function(req,res){
   res.send('Hello Test');
 })

 app.get('/test2',function(req,res){
  res.send('Good Bye');
 })*/

app.listen(8080);
