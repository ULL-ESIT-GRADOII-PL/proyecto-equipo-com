"use strict";

var express = require('express');
var app = express();

var path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000)); 


app.get('/', function (req, res) {
  res.render('layout');
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});