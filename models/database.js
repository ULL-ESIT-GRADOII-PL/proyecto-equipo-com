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
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Se ha conectado a la base de datos con éxito.");
      prepararSchema();
    });
    
};

var prepararSchema = function() {
    //Elementos de la base de datos
    CsvSchema = mongoose.Schema({
        "nombre" : String,
        "contenido" : String,
        "numeroRegistro" : Number,
        "elementoActual" : Boolean
    });
    
    Csv = mongoose.model("Csv", CsvSchema);
}

var insertarEjemplo = function() {
let csvTemp = new Csv({
                "nombre": "ejemplo",
                "contenido": "contenido",
                "numeroRegistro" : 5,
                "elementoActual" : 2
            });
            
            let p1 = csvTemp.save( (err) => { 
              if (err) console.log("Algo ha ido mal en el guardado");
            });
            
            p1.then( (value) => {
                console.log("Guardado: " + value.nombre);
                //mongoose.connection.close();
            });
}

// Función para recuperar los botones que deben mostrarse
var getBotones = module.exports.getBotones = function(res) {
    var findedEnv;
    Csv.find({}, (err, finded) => {
        findedEnv = finded;
        res.render('layout', { title: 'CSV ajax', botones: findedEnv});
      //  mongoose.connection.close();
    });
    
};


//Función para guardar una entrada en la base de datos
var guardarEntrada = module.exports.guardarEntrada = function(req, res) {
    
    let numEntradas;
    let numReg;
    let elementoAct;
    let answer;
    
    Csv.find((err, finded) => {
        console.log("error",err);
        numEntradas = finded.length;
        console.log("num entradas",numEntradas);
    }).then( (value) => {
        if(numEntradas < 4) {
            //Se pueden crear registros
            numReg = numEntradas + 1;
            if (numEntradas == 0) {
                elementoAct = true;
            }
            else {
                elementoAct = false;
            }
            
            let csvTemp = new Csv({
                "nombre": req.query.nombre,
                "contenido": req.query.contenido,
                "numeroRegistro" : numReg,
                "elementoActual" : elementoAct
            });
            
            let p1 = csvTemp.save( (err) => { 
              if (err) console.log("Algo ha ido mal en el guardado");
            });
            
            p1.then( (value) => {
                console.log("Guardado: " + value.nombre);
            });
            
        }
        else {
            //Se reutilizan registros
            console.log("reutilizando reg");
            
            Csv.find({elementoActual : true}, (err, finded) => {
                numReg = finded[0].numeroRegistro;
                answer = numReg;
            }).then( (value) => {
                let siguiente = (numReg + 1) % 4;
                if (siguiente == 0) siguiente = 4;
                //Actualizando registro actual y el siguiente
                Csv.update({numeroRegistro : siguiente},{elementoActual : true}, () => {
                    Csv.update({numeroRegistro : numReg},
                        {nombre: req.query.nombre, contenido : req.query.contenido, elementoActual : false},
                        () => {
                            res.send(answer.toString());
                           // mongoose.connection.close();
                        });
                });
            });
            
        }
    });
};