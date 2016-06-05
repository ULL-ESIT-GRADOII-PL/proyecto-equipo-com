module.exports = (function() {

 function eachBlockPre(tree, callbackAction,f,error) {
  
  var symbolTable = callbackAction(tree,f);
  if (typeof symbolTable === 'string') {
    error = symbolTable;
  }

  tree.functions.forEach(function (t) {
    error = eachBlockPre(t,callbackAction,symbolTable,error);
  });
  return error;
}

function callbackAction(nodo,f) {
  //console.log(nodo.type);
  //Construccion de la tabla de simbolos
  var sT = {
    father: f
  };
  
  var e = undefined;

  nodo.constants.forEach(function(x) {
    
    if (sT[x[0]] == undefined) {
      //console.log(sT[x[0]]);
      sT[x[0]] = x;
    } else {
      e = "Constante duplicada:  " + x[0];
    }
  });

  nodo.variables.forEach(function(x) {
    if (sT[x] == undefined) { 
      //console.log("add");
      sT[x] = x;
    } else {
      e = "Variable duplicada:  " + x;
    }
    
  });


  nodo.functions.forEach(function(x) {
    if (sT[x.name] == undefined) {
      //console.log(sT[x[0]]);
      sT[x.name] = x;
    } else {
        e = "Funcion duplicada:  " + x.name;
    }
    
  });
  
  if((nodo.params != undefined)) {
    nodo.params.forEach(function(p) {
      sT[p] = p;
    });
  }
  

  Object.assign (nodo,{symbolTable: sT});
  console.log(e);
  if (e != undefined) return e;
  return nodo.symbolTable;
}
function ReadableTree(tree) {
  //console.log("readable");

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

function DeclarationBeforeUse(tree,error) {
  
  if (tree.main.type == 'COMPOUND') {
    //console.log(tree);
    tree.main.children.forEach(function (child) {
      error = CheckVar(child,tree.symbolTable,error);
    });
      
    
  }
  else {
    error = CheckVar(tree.main,tree.symbolTable,error);
  }
  
  
  tree.functions.forEach(function (t) {
   
    error = DeclarationBeforeUse(t,error);
  });
  
  //console.log(error);
  return error;

}

function CheckVar(child,symbolTable,error) {
  
  switch (child.type) {
        case '=':
          error = Check(child.left,symbolTable,error);
          error = Check(child.right,symbolTable,error);
          break;
        case 'RETURN':
          error = Check(child.children,symbolTable,error);
          break;
        case 'IF':
          error = Check(child.c,symbolTable,error);
          error = CheckVar(child.st,symbolTable,error);
          break;
        case 'COMPOUND':
          child.children.forEach(function (child) {
            error = CheckVar(child,symbolTable,error);
          });
          break;
        case 'IFELSE':
          error = Check(child.c,symbolTable,error);
          error = CheckVar(child.st,symbolTable,error);
          error = CheckVar(child.sf,symbolTable,error);
          break;
        case 'WHILE':
          error = Check(child.c,symbolTable,error);
          error = CheckVar(child.st,symbolTable,error);
          break;
        default:
          console.log("No implementado para tipo:  " + child.type);
  }
  //console.log(error);
  return error; 
}

function Check(child,symbolTable,error) {
  
  if (child.type == 'ID') {
    if (symbolTable[child.value] == undefined) {
      error = "Variable no declarada: " + child.value;
      console.log("deep" + error);
    }
  }
  else {
    if (child.left != undefined)
      error = Check(child.left,symbolTable,error);
    //console.log("++++" + error);
    if (child.right != undefined)
      error = Check(child.right,symbolTable,error);
    //console.log("---" + error);
    
  }
  
  return error;
}

return {
  eachBlockPre: eachBlockPre,
  callbackAction: callbackAction,
  ReadableTree: ReadableTree,
  DeclarationBeforeUse: DeclarationBeforeUse
};

})();