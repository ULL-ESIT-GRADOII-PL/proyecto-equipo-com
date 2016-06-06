#!/usr/local/bin/node --harmony_destructuring
// pegjs pl0.pegjs ../models/pl0.js
var util = require('util');
var fs = require('fs');
var PEG = require("../models/pl0.js");
var SEMANTIC = require("../lib/semantic.js");

var fileName = process.argv[2] || 'input1.pl0';
fs.readFile(fileName, 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Processing <***\n${input}\n***>`);
  try {
    var r = PEG.parse(input);
    //SEMANTIC.eachBlockPre(r,SEMANTIC.callbackAction,null);
    //SEMANTIC.ReadableTree(r);
    console.log(util.inspect(r, {depth: null}));
  } catch (e) {
    //console.log(`Error en línea ${e.location.start.line} columna ${e.location.start.column}`);
    console.log(e);
  }
});
