//Importante¡¡¡¡    Generar el código de pl0.pegjs para los test con "pegjs -e peg pl0.pegjs ../tests/pl0.js"
var expect = chai.expect


describe('PL0', function(){
    it ('"=" se puede evaluar como una expresion', function () {
        expect(peg.parse("a = (b = 4)*b+2")).to.deep.equal({ type: 'BLOCK',
                                                              constants: [],
                                                              variables: [],
                                                              functions: [],
                                                              main:
                                                               { type: '=',
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
                                                                    right: { type: 'NUM', value: 2 } } },
                                                              name: { type: 'ID', value: '$main' },
                                                              params: [] });

    });

    it ('";" permite multiples sentencias', function () {
        expect(peg.parse("{ a = 5; b = 4 + 6 }")).to.deep.equal({ type: 'BLOCK',
                                                                  constants: [],
                                                                  variables: [],
                                                                  functions: [],
                                                                  main:
                                                                   { type: 'COMPOUND',
                                                                     children:
                                                                      [ { type: '=',
                                                                          left: { type: 'ID', value: 'a' },
                                                                          right: { type: 'NUM', value: 5 } },
                                                                        { type: '=',
                                                                          left: { type: 'ID', value: 'b' },
                                                                          right:
                                                                           { type: '+',
                                                                             left: { type: 'NUM', value: 4 },
                                                                             right: { type: 'NUM', value: 6 } } } ] },
                                                                  name: { type: 'ID', value: '$main' },
                                                                  params: [] });

    });

    it ('se permiten comparadores tipo "<",">="', function () {
        expect(peg.parse("{a = 4; b = a <= 5; c = b > 3}")).to.deep.equal({ type: 'BLOCK',
                                                                          constants: [],
                                                                          variables: [],
                                                                          functions: [],
                                                                          main:
                                                                           { type: 'COMPOUND',
                                                                             children:
                                                                              [ { type: '=',
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
                                                                                     right: { type: 'NUM', value: 3 } } } ] },
                                                                          name: { type: 'ID', value: '$main' },
                                                                          params: [] });

    });

    it ('se permiten la estructura while do', function () {
        expect(peg.parse("while 4  < 5 do a = 7")).to.deep.equal({ type: 'BLOCK',
                                                                    constants: [],
                                                                    variables: [],
                                                                    functions: [],
                                                                    main:
                                                                     { type: 'WHILE',
                                                                       c:
                                                                        { type: '<',
                                                                          left: { type: 'NUM', value: 4 },
                                                                          right: { type: 'NUM', value: 5 } },
                                                                       st:
                                                                        { type: '=',
                                                                          left: { type: 'ID', value: 'a' },
                                                                          right: { type: 'NUM', value: 7 } } },
                                                                    name: { type: 'ID', value: '$main' },
                                                                    params: [] });

    });

    it ('se permiten llamadas a funciones', function () {
        expect(peg.parse("a = fact(8,6,a)")).to.deep.equal({ type: 'BLOCK',
                                                              constants: [],
                                                              variables: [],
                                                              functions: [],
                                                              main:
                                                               { type: '=',
                                                                 left: { type: 'ID', value: 'a' },
                                                                 right:
                                                                  { type: 'CALL',
                                                                    func: { type: 'ID', value: 'fact' },
                                                                    arguments:
                                                                     [ { type: 'NUM', value: 8 },
                                                                       { type: 'NUM', value: 6 },
                                                                       { type: 'ID', value: 'a' } ] } },
                                                              name: { type: 'ID', value: '$main' },
                                                              params: [] });

    });

    it ('se permite el uso de return', function () {
        expect(peg.parse("if num <= 1 then return 1")).to.deep.equal({ type: 'BLOCK',
                                                                        constants: [],
                                                                        variables: [],
                                                                        functions: [],
                                                                        main:
                                                                         { type: 'IF',
                                                                           c:
                                                                            { type: '<=',
                                                                              left: { type: 'ID', value: 'num' },
                                                                              right: { type: 'NUM', value: 1 } },
                                                                           st: { type: 'RETURN', children: { type: 'NUM', value: 1 } } },
                                                                        name: { type: 'ID', value: '$main' },
                                                                        params: [] });

    });

    it ('se permite la declaración de constantes,variables y funciones', function () {
      expect(peg.parse(
      "const a = 7;"+
      "var b;"+
      "function fun(x)"+

      "var u,i;"+
      "function aux()"+
      "const t  = 4;"+
      "{ x = 5 }; { };  { }"
      )).to.deep.equal({ type: 'BLOCK',
                          constants: [ [ 'a', 7 ] ],
                          variables: [ 'b' ],
                          functions:
                           [ { type: 'FUNCTION',
                               constants: [],
                               variables: [ 'u', 'i' ],
                               functions:
                                [ { type: 'FUNCTION',
                                    constants: [ [ 't', 4 ] ],
                                    variables: [],
                                    functions: [],
                                    main:
                                     { type: 'COMPOUND',
                                       children:
                                        [ { type: '=',
                                            left: { type: 'ID', value: 'x' },
                                            right: { type: 'NUM', value: 5 } } ] },
                                    name: 'aux',
                                    params: [] } ],
                               main: { type: 'COMPOUND', children: [] },
                               name: 'fun',
                               params: [ 'x' ] } ],
                          main: { type: 'COMPOUND', children: [] },
                          name: { type: 'ID', value: '$main' },
                          params: [] });
    });

});
