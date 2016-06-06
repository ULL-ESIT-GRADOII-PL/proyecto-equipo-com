"use strict";

var express = require('express');
var app = express();

var path = require("path");
var PEG = require("./models/pl0.js");
var SEMANTIC = require("./lib/semantic.js");
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
  let obj = undefined;
  
  try {
    obj = PEG.parse(req.query.contenido);
  }
  catch(e) {
    res.send(e.message + " Línea: " + e.location.start.line + " Columna: " + e.location.start.column);
  }
  
  if (obj != undefined) {
    let error = undefined;
    error = SEMANTIC.eachBlockPre(obj,SEMANTIC.callbackAction,null,error);
    if (error != undefined)
      res.send(error);
    else {
      error = SEMANTIC.DeclarationBeforeUse(obj,error);
      //console.log(error);
      if (error != undefined) 
        res.send(error);
      else {
        SEMANTIC.ReadableTree(obj);
        
        let arbol = util.inspect(obj, {depth: null});
        //console.log(arbol);
        res.send(arbol);
      }
    }
  }
});

// Para cuando se pida guardar en la base de datos
app.get('/mongo/save', (req, res) => {
    database.guardarEntrada(req, res);

});

// Para recuperar los botones al entrar en la página
app.get('/', (req, res)  => {
    database.getBotones(res);
});

// Recuperar el contenido de un botón pulsado
app.get('/mongo/queryBoton', (req, res) =>{
   database.queryBoton(req, res);

});


app.get('/tests', (req, res) => {
  console.log("tests env");
  res.render('test');
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});

