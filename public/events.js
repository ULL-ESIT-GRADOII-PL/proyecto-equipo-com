// Controlar el ajax que se ejecuta cuando haces click en botones, etc
(() => {
"use strict";

 const ajaxRequestSave = (input)  => {
        var nombr = prompt("Escribe un nombre");
        if (nombr != null) {
            if (nombr == "") nombr = "Sin nombre";
            $.ajax({
               url: '/mongo/save',
               type: 'GET',
               data: {nombre: nombr , contenido: input.value},
                   success: function(data){
                       $("#" + data + " span").text(nombr);
                   }
                   , error: function(jqXHR, textStatus, err){
                       console.error('text status '+textStatus+', err '+err);
                   }
            });
        }
        setTimeout(function(){
            location.reload();
        }, 500);
    };
    
    $(document).ready(() => {
        
        $('#buttonSave').click(() => {
            ajaxRequestSave(original);
        });
        
        
    });
    
})();