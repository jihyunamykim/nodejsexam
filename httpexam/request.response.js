var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var jade = require('jade');

http.createServer(function (req, res){
	if(req.method == 'GET'){
		console.log(req.url+"GET");
		if(req.url =='/'){			
			fs.readFile('index.html',function(err,data){
				if(! err){
					res.writeHead(200,{'content-Type':'text/html'});
					res.end(data);
				} else {
					res.writeHead(484);
					res.end();
				}
			});
		}else if(req.url == '/ejs'){
			fs.readFile('temp.ejs','utf8',function(err,data){
				if(!err){
					var html = ejs.render(data, {name:'Hong',description :'Hello'});
					res.writeHead(200,{'content-Type':'text/html'});
					res.end(html);
				}
			});
		} else if(req.url =='/jade'){
			fs.readFile('temp2.ejs','utf8',function(err,data){
				if(!err){
					var fn = jade.compile(data);
					var html = fn({name:'Hong',description :'Hello'});
					res.writeHead(200,{'content-Type':'text/html'});
					res.end(html);
				}
			});			
		}
    }else if(req.method == 'POST'){
    	console.log(req.url+"POST");
  	 	req.on('data',function(data){
    	res.writeHead(200,{'content-Type':'text/html'});
    	res.end('<h1>'+data+'</h1>');
    	});
    }
}).listen(52273,function(){
	console.log('Server running...');
	});