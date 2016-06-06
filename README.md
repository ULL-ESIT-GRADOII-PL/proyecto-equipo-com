-[![Build Status](https://travis-ci.org/alu0100825893/proyecto-equipo-com.svg?branch=master)](https://travis-ci.org/alu0100825893/proyecto-equipo-com)

## Proyecto Procesadores de Lenguajes
### ETSII ULL Grado de Informatica

* [Página en Github Carlos](https://ctc87.github.io/)
* [Página en Github Oscar](https://alu0100825893.github.io/)
* [Página en Github Miguel](https://alu0100886870.github.io/)
* [Página de la asignatura PL Carlos](http://ctc87.github.io/Practicas_PL/)
* [Página de la asignatura PL Oscar](https://alu0100825893.github.io/)
* [Página de la asignatura PL Miguel](https://alu0100886870.github.io/pl.html)
* [Repositorio](https://github.com/ULL-ESIT-GRADOII-PL/proyecto-equipo-com)
* [Aplicación-C9](https://my-space-alu0100825893.c9.io)
* [Fork-Con los Issues](https://github.com/alu0100825893/proyecto-equipo-com)
* [Test](https://my-space-alu0100825893.c9.io/tests/) (En el despliege se pueden ver los test)

### Objetivo
Escriba un analizador del lenguaje PL0 usando PEGjs así como las tecnologías vistas durante el curso: ECMA6, Node.js, expressJS, MongoDB, Mongoose, SASS, etc.
La salida debe ser el árbol de análisis sintáctico del programa de entrada.

### Mejoras
Pueden introducir las mejoras que les resulten interesantes. Siguen algunas sugerencias:
- Ampliación de la gramática de PL0:
  * Se pide modificar la gramática del lenguaje PL/0 para que acepte las sentencias if-then-else y maneje argumentos en los procedimientos (PROCEDURE y CALL).
- Análisis semántico
  * Comprobar que las variables han sido declaradas antes de su uso
  * Comprobar que las llamadas tienen el mismo número de argumentos que en su declaración
- Uso de otras tecnologías, por ejemplo MathJax para poner fórmulas matemáticas en la documentación, Editores como Ace o codemirror para facilitar la entrada, realizar pruebas en el cliente y/o en el servidor, etc.

### Documentación de la gramática

- Estructura: La gramatica obliga a seguir el siguiente orden

    * 1 Declaraciones: Constantes, variables y funciones.
    * 2 Sentencias
- Estructura con la mayor simplicidad posible muy simple. Dentro de las llaves van las sentencias y antes las declaraciones: {}
- Constantes:
    * Una: const a = 5;
    * Varias: const a = 5,b = 6;
- Variables:
    * Una: var a;
    * Varias: var a,b;
- Funciones:
    * Simple: function fact() {};
    * Con argumentos: function fact(x,y) {};
    * Con declaraciones: function fact(x,y) const a = 3; var b; {};
    * Con sentencias: function fact(x) {x = 5; return x};
- Sentencias:
    * Pueden no agruparse (solo una y no termina con ; ni requiere llaves {} ) o agruparse (2 o más,todas terminan en ; menos la última, y requieren llaves{})
    * if then else:     if a < 3 then { a = 3} else { return a }
    * for to do:    for 1 to 5 do { a = a + 1 }
    * switch do: switch a do { case 1: a = 1 case 5: { a = 5; return a} break;}
    * if then: if a < 3 then return a
    * while do: while a == 3 do {a = a + 2}
    * do while: do {a = a + 2} while a == 3 
    * return : return a + 3
    * asignacion: a = a - b
- Errores:
    * Sintácticos: No se hace el análisis semántico y se comunica el error. 
    * Semánticos: Se comunica el error. Detecta declaraciones duplicadas y variables usadas que no han sido declaradas.