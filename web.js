var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
    /*var fs = require('fs');
    fs.readFile('index.html','utf8',function(err,data){
	if(err){
	    return console.log("ASHWIN->"+err);
	}
	console.log(data);
        response.send(data);
    });*/
    response.send("hello");
    
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});