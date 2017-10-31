var fs = require('fs')

fs.readFile('text1.txt','utf-8',function(err, data){
	if(err)
		return console.error(err)
	console.log(data)

fs.readFile('text2.txt','utf-8',function(err, data){
	if(err)
		return console.error(err)
	console.log(data)

fs.readFile('text3.txt','utf-8',function(err, data){
	if(err)
		return console.error(err)
	console.log(data)
})
})
})

console.log('Finish')
