var express = require('express'); //returns function
var bodyParser = require('body-parser');  //middleware for parsing the body of the request
var app = express(); //app is the working express app

//use environment variables for port
var port = process.env.PORT || 3000;

//we are getting the url encoding parser
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//if the body is sent as json:
// create application/json parser
var jsonParser = bodyParser.json();


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

//respond to http GET request
//and map to particular url
//url: '/' will match homepage
//the callback has two parameters, req and respond
//these are express req and res that wraps up the standard http req and res
//and provides a bit more functionality to make things easier
//we can have the same url and different methods
app.get('/', function(req, res) {
    //don't need to put content type
    //the browser will make http request for 'assets/style.css' and that request will be handled by node by middlware, app.use
    //before setting view engine, we send html manually:
    // res.send('<html><head><link href="assets/style.css" type="text/css" rel="stylesheet"></head><body><h1>Hello world!</h1></body></html>');

    //after setting up the view engine:
    res.render('index');
});

//post method with json
app.get('/api', function(req, res) {
    //express will parse as json
    res.json({ firstname: 'John', lastname: 'Doe' });
});

// ':' means it allows anything to be there
// access as req.params.id
app.get('/person/:id', function(req, res) {
    // res.send('<html><head></head><body><h1>Person: ' + req.params.id + '</h1></body></html>');
    res.render('person', { ID: req.params.id, QSTR: req.query.qstr });
    //the ID will be used as regular variable inside the person.ejs file
});

//make POST to the same person page
//we'll use the urlencodedParser as a middleware that will be called before the other callback function is called
app.post('/person', urlencodedParser, function(req, res) {
    res.send('Thank you!');
    //req.body will be added by this middleware
    console.log('BODY: ', req.body);
    console.log('firstname: ', req.body.firstname);
    console.log('lastname: ', req.body.lastname);
});

//post json:
app.post('/personjson', jsonParser, function(req, res) {
    res.send('Thank you for the JSON data');
    console.log('BODY: ', req.body);
    console.log('firstname: ', req.body.firstname);
    console.log('lastname: ', req.body.lastname);
});


// REST: Representational State Transfer
// An architectural style for building APIs
// Meaning: We decide that HTTP verbs and URLs mean something
// follow good url structure and methods
// The idea of RESTful API: (has decent urls that are clear as far as what they do)

app.get('/api/person/:id', function(req, res) {
    //get that data from the database
});
app.post('/api/person', jsonParser, function(req, res) {
  //save to the database
});
app.delete('/api/person/:id', function(req, res) {
  //delete from the databse
})


app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
