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
                   alert('text status '+textStatus+', err '+err);
               }
        });
        
        
    });
    
    
});