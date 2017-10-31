net  = require('net')
clients = [];

server = net.createServer(function(socket){




	socket.on( "error", err => {
             console.log(``);
						socket.destroy();
         } );

         socket.on( "timeout", () => {
             console.log("onTimeout says nothing");
						 socket.destroy();
         } );

         socket.on( "end", () => {
             console.log("onEnd says nothing");
						socket.destroy();
         } );



//console.log(clients.reverse())

	var IP ;
	var NAME;

	///////
 function getIP(name,ip){
clients[ip]=name;
 }
 ///////
	socket.on('data',function(data){

		socket.name = socket.remoteAddress
		clients.push(socket.name)

	var text=data.toString().split(':',2);
		if (text[0]=="Name"){
				NAME=text[1];
				IP=socket.name;
	  	 console.log(NAME+' joined the chat')
				getIP(NAME,IP);
			}
			else{
				for (var key in clients)
				{
					if(key==socket.name){
						console.log(clients[key]+' send : '+data.toString())
					}

					if(data.toString()==="exit"){
						console.log( clients[key] + ' has disconnected from the chat.' + socket.id);
						socket.end();

					}


				}
			}

});


////////
	process.stdin.resume();
	process.stdin.on('data',function(data){
		socket.write(data)


	});
/////////////

});

server.listen(8080)
