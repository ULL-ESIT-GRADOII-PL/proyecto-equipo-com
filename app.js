"use strict";

var express = require('express');
var app = express();

var path = require("path");
var PEG = require("./models/pl0.js");
var SEMANTIC = require("./lib/semantic.js");
var util = require('util');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));


app.get('/', (req, res) => {
  res.render('layout');
});

app.get('/arbol', (req, res) => {
  console.log(req.query.contenido);
  //Obteniendo el arbol representativo con la gramática pl0
  let obj = PEG.parse(req.query.contenido);
  SEMANTIC.eachBlockPre(obj,SEMANTIC.callbackAction,null);
  SEMANTIC.ReadableTree(obj);
  let arbol = util.inspect(obj, {depth: null});
  console.log(arbol);
  res.send(arbol);


});



app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});
