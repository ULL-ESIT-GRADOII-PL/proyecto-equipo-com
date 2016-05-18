/*
 * Classic example grammar, which recognizes simple arithmetic expressions like
 * "2*(3+4)". The parser generated from this grammar then AST.
 */
//pegjs pl0.pegjs ../models/pl0.js
{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

code = first:st rest:(SC st)* {
            var result = [];
            
            if (first) result.push(first);
            
            if(rest.length != 0) {
                var aux = rest.map(function(x) {
                    return x[1];
                });
            
                result = result.concat(aux);
            }
            return result;
        }

st     = IF e:exp THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               c:  e,
               st: st,
               sf: sf,
             };
           }
       / IF e:exp THEN st:st
           {
             return {
               type: 'IF',
               c:  e,
               st: st
             };
           }
        / WHILE c:exp DO st:st {
            return {
              type: 'WHILE',
              c:  c,
              st: st
            };
        }
        / RETURN e:exp {
            return {
              type: 'RETURN',
              children: e
            };
        }
        / assign

assign = i:ID ASSIGN e:exp
            { return {type: '=', left: i, right: e}; }
exp    = left:term comp:COMP right:term {
          return {
            type: comp,
            left: left,
            right: right
          };
        }
        / t:term   r:(ADD term)*   { return tree(t,r); }
term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = assign
        / f:ID LEFTPAR e:exp? r:(COMMA exp)* RIGHTPAR {
            var result = [];
            
            if (e) result.push(e);

            if(r.length != 0) {
                var aux = r.map(function(x) {
                    return x[1];
                });
            
                result = result.concat(aux);
            }
            
            return {
              type: 'CALL',
              func: f,
              arguments: result
            }
        }
        / NUMBER
        / ID
        / LEFTPAR t:exp RIGHTPAR   { return t; }


_ = $[ \t\n\r]*

ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
SC = _ ";" _
COMMA = _ "," _
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
WHILE    = _ "while" _
DO       = _ "do" _
RETURN = _ "return" _
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
            {
              return { type: 'ID', value: id };
            }
NUMBER   = _ digits:$[0-9]+ _
            {
              return { type: 'NUM', value: parseInt(digits, 10) };
            }
COMP = _ comp:("=="/"!="/"<="/">="/"<"/">") _ { return comp; }
