//Client
net = require('net');

socket = new net.Socket();

//connect Server
socket.connect(8080,'localhost',function(){
  console.log('Success');

//output
  socket.write('Hello ComSci');

});

// input ข้อมูลจาก Keyboard  เเล้วส่งค่าไปให้ Server
process.stdin.on('data',function(data){
  socket.write(data);
})

//ตัวรับค่ามาเเสดง
socket.on('data',function(data) {
  console.log(data.toString());

});
