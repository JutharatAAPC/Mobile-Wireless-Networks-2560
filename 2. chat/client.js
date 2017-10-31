net = require('net')
socket = new net.Socket()
//10.80.4.76   Yui
//10.80.6.177  Air
socket.connect(8008,'10.80.6.177',function(){
	console.log('success')
	a = 'Name:Liv'
	socket.write(a)

	process.stdin.resume();
	process.stdin.on('msg',function(data){
		socket.write(data)
	})
});

socket.on('msg',function(data){
	console.log('server send : '+data.toString())
});

// socket.off('end',function(data){
// 	console.log('server send : Exit')
// });
