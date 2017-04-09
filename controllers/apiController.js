module.exports = function(app) {

  // REST: Representational State Transfer
  // An architectural style for building APIs
  // Meaning: We decide that HTTP verbs and URLs mean something
  // follow good url structure and methods
  // The idea of RESTful API: (has decent urls that are clear as far as what they do)

  app.get('/api/person/:id', function(req, res) {
      //get that data from the database
  });
  app.post('/api/person', function(req, res) {
    //save to the database
  });
  app.delete('/api/person/:id', function(req, res) {
    //delete from the databse
  });

};
