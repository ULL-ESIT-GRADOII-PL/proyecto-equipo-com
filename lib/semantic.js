module.exports = (function() {

 function eachBlockPre(tree, callbackAction,f) {
  var symbolTable = callbackAction(tree,f);

  tree.functions.forEach(function (t) {
    eachBlockPre(t,callbackAction,symbolTable);
  });
}

function callbackAction(nodo,f) {
  console.log(nodo.type);
  //Construccion de la tabla de simbolos
  var sT = {
    father: f
  };

  nodo.constants.forEach(function(x) {
    sT[x[0]] = x;
  });

  nodo.variables.forEach(function(x) {
    sT[x] = x;
  });


  nodo.functions.forEach(function(x) {
    sT[x.name] = x;
  });

  Object.assign (nodo,{symbolTable: sT});
  return nodo.symbolTable;
}
function ReadableTree(tree) {
  console.log("readable");

  tree.functions.forEach(function (t) {
    ReadableTree(t);
  });

  var nom = [];
  tree.functions.forEach(function(x) {
    //Poniendo solo los nombres en la parte functions
    nom.push(x.name);
  });
  tree.functions = nom;
}

return {
  eachBlockPre: eachBlockPre,
  callbackAction: callbackAction,
  ReadableTree: ReadableTree
};

})();
