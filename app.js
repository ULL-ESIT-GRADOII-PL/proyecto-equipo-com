"use strict";

var express = require('express');
var app = express();

var path = require("path");
var PEG = require("./models/pl0.js");
var util = require('util');

// Bases de datos
var mongoose = require('mongoose');
var database = require('./models/database.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000)); 

/*
app.get('/', (req, res) => {
  res.render('layout');
});*/



// Iniciar la conexión con mongoDB
database.conectar();


app.get('/arbol', (req, res) => {
  console.log(req.query.contenido);
  //Obteniendo el arbol representativo con la gramática pl0
  let obj = PEG.parse(req.query.contenido);
  let arbol = util.inspect(obj, {depth: null});
  console.log(arbol);
  res.send(arbol);

  
});

// Para cuando se pida guardar en la base de datos
app.get('/mongo/save', (req, res) => {
    database.guardarEntrada(req, res);

});

// Para cuando se pida recuperar los botones
app.get('/', (req, res)  => {
    database.getBotones(res);
});


app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});

