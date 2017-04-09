var express = require('express'); //returns function
var app = express(); //app is the working express app
var mongoose = require('mongoose');

// !!!! important note for authenticating !!!!
// Make sure you are using the database username and password not the account username and password from Mlab.
//
// In MLab, formerly MongoLab, do the following
//
// Navigate to Users
// Add Database User
// Choose your username and password
// Now you can test this on the shell with  mongo ds061374.mlab.com:61374/yourdb -u <dbuser> -p <dbpassword>

mongoose.connect("mongodb://test:test123@ds157390.mlab.com:57390/addressbook");

var Schema = mongoose.Schema;   //the Schema lets me define the structure of the document

var personSchema = new Schema({
  //here we give the names of the properties and the types of the data they store
  firstname: String,
  lastname: String,
  address: String

});

//once we have the schema, we generate the function constructor
//what do we expect from the object using the schema, what will be the strucure
var Person = mongoose.model('Person', personSchema);

//then we can create new instances, new objects, following the structure
//this will be individual documents ultimately
var john = Person({

  firstname: 'John',
  lastname: 'Doe',
  address: '555 Main St.'

});

//we have access to methods
//save will save this document in that proper area in the mongodb as expected by that particular schema
john.save(function (err) {
  if (err) throw err;

  console.log('person saved!');
});

var jane = Person({

  firstname: 'Jane',
  lastname: 'Doe',
  address: '555 Main St.'

});

jane.save(function (err) {
  if (err) throw err;

  console.log('person saved!');
});


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

  //here we want to log the query

  //get all the users - '{}' -> means we ask for everything
  // in here, {}, we can actually put queries, specific things that we are looking for
  Person.find({}, function(err, users) {

    if(err) throw err;

    //object of all the users
    console.log(users);

  });

  next(); //this means: run the next middleware, call the next middleware that is connected to this particular route in some way
});

//the app is passed by reference

htmlController(app);

apiController(app);

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
