var express = require('express')
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	if (req.cookies.auth){
		res.send('<h1>Login Success</h1>'+
			'<form method ="POST" action ="/logout">' +
			'<input type="submit" value="Logout"/>'+
			'</form>');
	}else {
		res.redirect('/login');
	}
});

app.post('/logout',function(req,res){
	res.clearCookie('auth');
	res.redirect('/');
});

app.get('/login',function(req,res){
	fs.readFile(__dirname+'/public/login.html' ,
		function(err,data){
			if (err) {
				res.send(JSON.stringify(err));
			}else {
				res.send(data.toString());
			}
		});

});


app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if (username == 'hong' && password == '1234'){
        res.cookie('auth',true);
        res.redirect('/');
    }else {
    	res.redirect('/login');
    }
});



app.get('/a',function(req,res) {
    res.sned("<a href='/a'>Go to B</a>");
});

app.get('/b',function(req,res) {
    res.sned("<a href='/a'>Go to A</a>");
});

app.get('/page/:id',function(req,res) {
    var id = req.parmas.id;
    res.send("'<h1>"+id+' Page</h1>');
});

/*app.use(function(req,res){
	var name = req.query.name;
    var region = req.query.region;
    var agent = req.header('User-Agent');

    if(agent.toLowerCase().match(/chrome/)){
    	res.send('<h1>Hello chrome</h1>' +
    		'name:' +name + '<br>region: ' +region);
    }else {
    	res.send('<h1>Hello + , others </h1>');
    }
})*/

app.listen(52273 , function(){
	console.log('Server running ...');
})