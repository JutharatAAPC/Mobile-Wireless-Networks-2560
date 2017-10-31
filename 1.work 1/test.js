//Asyn
var fs = require('fs')

fs.readFile('text1.txt','utf-8',function(err, data){
	if(err)
		return console.error(err)
	console.log(data)
})

console.log('Finish')

