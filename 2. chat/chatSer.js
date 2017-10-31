// Server
net = require('net')

//Create Srever
net.createServer(function(socket){
	socket.on('data',function(data){

// output
	console.log(data.toString());
});

// รับค่า จาก Keyboard ส่งค่าให้ Client
process.stdin.on('data',function(data){
  socket.write(data);
});


}).listen(8080)
