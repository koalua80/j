var express = require("express"),
	app = express(),
	request = require("request"),
	port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine","ejs");



app.get("/", function(req,res){	
	var query = req.query.q || 'Kyiv';
	var url = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&apikey=c2dcf8ffb5cdc3f8977bfd2ae7ea4738'
	request(url, function(error,response,body){
	if(!error&&response.statusCode==200){
		var data = JSON.parse(body);
		res.render("results",{data:data});
	}else if(error.req){
		console.log("Problem with request!")
	}else{
		console.log("Error",error.message);
	}
});
});

app.listen(port, function(){
	console.log("Server running at PORT " + port);
})