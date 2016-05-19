"use strict";

var mongoose = require('mongoose');
module.exports.mongoose = mongoose;

//Declarar variables
var Csv;
var CsvSchema;


//Funcion para conectar con la base de datos

var conectar = module.exports.conectar = function() {
    
    //Conectando a una base de datos 
    mongoose.connect('mongodb://localhost/baseDatos');
    console.log('Se ha conectado con la base de datos');
    
};