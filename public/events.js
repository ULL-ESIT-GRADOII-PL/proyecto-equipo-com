// Controlar el ajax que se ejecuta cuando haces click en botones, etc
(() => {
"use strict";

const resultTemplate = `
<div class="contenido">
   <table id="result" class="center">
     <% _.each(items, function(name) { %>
       <tr class="<%= name.rowClass %>">
         <% _.each(name.value, function(cell) { %>
           <td><%= cell %></td>
         <% }); %>
       </tr>
     <% }); %>
   </table>
  </p>
</div>
`;

// Solicitar a la base de datos el contenido de los botones.

 const ajaxRequestBDGet = (idBoton)  => {
            $.ajax({
               url: '/mongo/queryBoton',
               type: 'GET',
               cache: false,
               data: {botonId: idBoton},
               success: function(data){
                   $('#original').val(data);
               }
               , error: function(jqXHR, textStatus, err){
                   alert('text status '+textStatus+', err '+err);
               }
            });
        };


// Solicitar al usuario que escriba un nombre para guardar en la base de datos.

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
        
        // Cuando se haga click en guardar ejecutamos la función de guardado
        $('#buttonSave').click(() => {
            ajaxRequestSave(original);
        });
        
        // Cuando se haga click en un boton de la base de datos, recuperar su contenido.
         $('.botonQuery').click((event) => {
            console.log(event.currentTarget);
            ajaxRequestBDGet(event.currentTarget.id.toString());
        });
        
        
    });
    
})();