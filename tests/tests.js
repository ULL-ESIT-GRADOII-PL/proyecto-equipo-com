//Importante¡¡¡¡    Generar el código de pl0.pegjs para los test con "pegjs -e peg pl0.pegjs ../tests/pl0.js"
var expect = chai.expect


describe('PL0', function(){
    it ('"=" se puede evaluar como una expresion', function () {
        expect(peg.parse("a = (b = 4)*b+2")).to.deep.equal([ { type: '=',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: 
                                                                 { type: '+',
                                                                   left: 
                                                                    { type: '*',
                                                                      left: 
                                                                       { type: '=',
                                                                         left: { type: 'ID', value: 'b' },
                                                                         right: { type: 'NUM', value: 4 } },
                                                                      right: { type: 'ID', value: 'b' } },
                                                                   right: { type: 'NUM', value: 2 } } } ]);
        
    });

    it ('";" permite multiples sentencias', function () {
        expect(peg.parse("a = 5; b = 4 + 6")).to.deep.equal([ { type: '=',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: { type: 'NUM', value: 5 } },
                                                              { type: '=',
                                                                left: { type: 'ID', value: 'b' },
                                                                right: 
                                                                 { type: '+',
                                                                   left: { type: 'NUM', value: 4 },
                                                                   right: { type: 'NUM', value: 6 } } } ]);
        
    });
    
    it ('se permiten comparadores tipo "<",">="', function () {
        expect(peg.parse("a = 4; b = a <= 5; c = b > 3")).to.deep.equal([ { type: '=',
                                                                            left: { type: 'ID', value: 'a' },
                                                                            right: { type: 'NUM', value: 4 } },
                                                                          { type: '=',
                                                                            left: { type: 'ID', value: 'b' },
                                                                            right: 
                                                                             { type: '<=',
                                                                               left: { type: 'ID', value: 'a' },
                                                                               right: { type: 'NUM', value: 5 } } },
                                                                          { type: '=',
                                                                            left: { type: 'ID', value: 'c' },
                                                                            right: 
                                                                             { type: '>',
                                                                               left: { type: 'ID', value: 'b' },
                                                                               right: { type: 'NUM', value: 3 } } } ]);
        
    });
    
    it ('se permiten la estructura while do', function () {
        expect(peg.parse("while 4  < 5 do a = 7")).to.deep.equal([ { type: 'WHILE',
                                                                            c: 
                                                                             { type: '<',
                                                                               left: { type: 'NUM', value: 4 },
                                                                               right: { type: 'NUM', value: 5 } },
                                                                            st: 
                                                                             { type: '=',
                                                                               left: { type: 'ID', value: 'a' },
                                                                               right: { type: 'NUM', value: 7 } } } ]);
                                                                                
    });
    
    it ('se permiten llamadas a funciones', function () {
        expect(peg.parse("a = fact(8,6,a)")).to.deep.equal([ { type: '=',
                                                                    left: { type: 'ID', value: 'a' },
                                                                    right: 
                                                                     { type: 'CALL',
                                                                       func: { type: 'ID', value: 'fact' },
                                                                       arguments: 
                                                                        [ { type: 'NUM', value: 8 },
                                                                          { type: 'NUM', value: 6 },
                                                                          { type: 'ID', value: 'a' } ] } } ]);
                                                                                
    });
    
    it ('se el uso de return', function () {
        expect(peg.parse("if num <= 1 then return 1")).to.deep.equal([ { type: 'IF',
                                                                        c: 
                                                                         { type: '<=',
                                                                           left: { type: 'ID', value: 'num' },
                                                                           right: { type: 'NUM', value: 1 } },
                                                                        st: { type: 'RETURN', children: { type: 'NUM', value: 1 } } } ]);
                                                                                                                                                    
    }); 
    
    
});
