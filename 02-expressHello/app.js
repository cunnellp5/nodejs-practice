var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('poop');
});

app.get('/morepoop', function(req, res) {
  res.send('💩');
});

app.get('/:id/poops', function(req, res) {
  res.send(`user ${req.params.id} tooka 💩`);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});