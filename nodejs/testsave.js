/*********** GET **************/
// http = require('http')
// url =  require('url');
//
// http.createServer(function(req,res){
//   //res.writeHead(200,{'Content-Type':'application/json'});
//   res.writeHead(200,{'Content-Type':'text/plain'});
//   //res.write('{"test":"Hello"}')
//   data = url.parse(req.url,true).query
//   if (data.year < 2014) {
//     res.write('year old')
//   }else {
//     res.write(data.year)
//   }
//   /*for (A in data)
//     res.write(A+" ",data[A])*/
//   res.end()
// }).listen(8080)

///////////////////////////////////
http = require('http')
url =  require('url');

http.createServer(function(req,res){
  if (req.method == 'GET') {
    req.on('data'/function(data){
      res.write(data)
    })
  }
  res.writeHea  d(200,{'Content-Type':'text/plain'});

  data = url.parse(req.url,true).query
  if (data.year < 2014) {
    res.write('year old')
  }else {
    res.write(data.year)
  }

  res.end()
}).listen(8080)
