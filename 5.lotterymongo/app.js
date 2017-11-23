var express = require('express');
var app = express();
var scraping = require('./scraping.js');
var request = require('request');
var cheerio = require('cheerio');
// var fs = require('fs');
var db = require('./file/db.json');
var obj = [];

app.get('/', function(req,res){
    console.log(scraping.sc);
})
app.listen(8000);