import { soma } from './soma';
import { Calculadora } from './calculadora';
// const soma = (n1: number, n2: number): number => {
//   return n1 + n2;
// };
var resultadoSoma = soma(2, 3);
console.log("Resultado \u00E9: " + resultadoSoma);
var calculadora = new Calculadora(5, 2);
var resultadoCalculadora = calculadora.subtrair();
console.log("Resultado \u00E9: " + resultadoCalculadora);
console.log("n1 \u00E9 " + calculadora['n1']);
