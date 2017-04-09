var express = require('express'); //returns function
var app = express(); //app is the working express app

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

//use environment variables for port
var port = process.env.PORT || 3000;

//express middleware: via npm, installs some js code that deals with a standard express request and express response
//middlewares can chain, can send requests and responses until the response is ready to be send

//using middleware, match a route
//meaning: every time we see '/assests/:someFile',
//go find '__dirname + '/public'' full path, look for the file
// if you leave the route, it will fire for every request
app.use('/assets', express.static(__dirname + '/public'));
//middleware: between the request and the respond
//it will respond by streming the files in the public folder

//a template engine is just a utility that
//will take text and translate it ultimately into html
//that should be delivered into http response
app.set('view engine', 'ejs');
//we also specify the file extension, in this case is 'ejs'

//by default, the express framework will look for
// the static files inside a 'views' folder

app.use('/', function(req, res, next) {
  console.log('Request url: ' + req.url);
  next(); //this means: run the next middleware, call the next middleware that is connected to this particular route in some way
});

//the app is passed by reference

htmlController(app);

apiController(app);

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
