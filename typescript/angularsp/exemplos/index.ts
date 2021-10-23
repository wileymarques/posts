import { soma } from './soma.js';
import { Calculadora } from './calculadora.js';

// const soma = (n1: number, n2: number): number => {
//   return n1 + n2;
// };

const resultadoSoma: number = soma(2, 3);
console.log(`Resultado é: ${resultadoSoma}`);

const calculadora = new Calculadora(5, 2);
const resultadoCalculadora = calculadora.subtrair();
console.log(`Resultado é: ${resultadoCalculadora}`);

console.log(`n1 é ${calculadora['n1']}`);
