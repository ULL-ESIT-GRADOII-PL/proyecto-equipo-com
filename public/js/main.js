"use strict";

$(document).ready(function () {
    $("#conseguirArbol").click(function() {
        var original = document.getElementById("original").value;
        $.ajax({
               url: '/arbol',
               type: 'GET',
               data: {contenido: original},
               success: function(data) {
                $("#arbolFinal").text(data);
               }
               , error: function(jqXHR, textStatus, err){
                   $("#arbolFinal").text("No se han recibido datos");
               }
        });
        
        
    });
    
    
});

//Funcion para cargar un archivo de ejemplo en la entrada
var dump = function(fileName) {
    $.get(fileName, function (data) {
        $("#original").val(data);
    });
};