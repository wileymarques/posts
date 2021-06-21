---
title: TypeScript vs Dart - Declaração de Variáveis
published: true
description: Comparação entre os tipos de declaração de variáveis em TypeScript e Dart
tags: typescript, javascript, dart, flutter
series: TypeScript vs Dart
---

TypeScript, [por ser apenas uma _camada_ em cima do JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#a-typed-superset-of-javascript), traz as mesmas três formas de declaração de variáveis:

- `var`
- `let`
- `const`

Dart também possui três formas, mas um pouco diferentes:

- `var`
- `final`
- `const`

Vamos ver essas diferenças.

> Todos os exemplos podem ser executados no [TypeScript Playground, no caso do TypeScript](https://www.typescriptlang.org/play), e no [DartPad, para Dart](https://dartpad.dartlang.org/?null_safety=true).

## Declaração de variáveis em TypeScript

`let` e `const` são formas relativamente novas, introduzidas para resolver alguns problemas inerentes a `var`. Mas vamos começar com algumas características do `var` para entendermos o porquê de `let` e `const` serem criados.

### Confusões do `var` em TypeScript

A primeira característica _confusa_ de `var` é a possibilidade de declarar a mesma variável várias vezes. Ou, em outras palavras, declarar múltiplas variáveis com o mesmo nome:

```ts
var x = 10;
var x = 15; // Variável `x` foi criada novamente
```

Além disso, podemos atribuir um valor a uma variável antes mesmo de ela ter sido declarada:

```ts
x = 15; // Atribuindo valor à variável `x` antes de sua declaração
var x; // Declaração da variável
```

> Curiosidade: Essa característica está ligada a como funciona [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) em JavaScript.

Normalmente, o maior ponto de confusão diz respeito ao escopo de uma variável declarada com `var`. Com escopo queremos dizer em qual parte do código a variável pode ser usada. Em diversas linguagens o escopo é por bloco (exemplo: `if`) onde a variável foi declarada, mas `var` em TypeScript tem o escopo por função.

Por exemplo, podemos declarar uma variável dentro de um `if` e usá-la fora:

```ts
if (false) {
  var x = 15; // Declarando variável dentro do `if`
}
x = 10; // Acessando variável
```

Isso acontece porque, como dito acima, o escopo de `var` é _por função_ e não _por bloco_. Para ficar mais claro, usemos como exemplo o mesmo código acima com uma função:

```ts
function myFunction(): number {
  if (false) {
    var x = 15; // Declarando variável dentro do `if`
  }
  x = 10; // Variável pode ser acessada em qualquer parte da função `myFunction`
  return x;
}
```

Como pudemos ver, `var` em TypeScript tem alguns pontos de confusão que, se não bem entendidos, podem trazer problemas ao código. Não é incomum introduzirmos erros no programa por conta disso. Além disso, desenvolvedores com conhecimento em outras linguagens não esperam esses comportamentos.

Na tentativa de resolver esses problemas, `let` e `const` foram introduzidos.

### `let` to the rescue

Basicamente, o `let` funciona como o `var` mas com os problemas corrigidos. Com isso, geralmente, devemos deixar de usar `var` e utilizarmos apenas `let` e `const`. Vamos recapitular os pontos levantados anteriormente e ver como `let` se comporta.

Vamos começar declarando a mesma variável duas vezes:

```ts
let x = 10;
let x = 15; // Error: Cannot redeclare block-scoped variable 'x'
```

Ao executar esse código, o compilador do TypeScript informa que a variável já havia sido declarada anteriormente.

Próximo ponto, atribuir um valor a uma variável antes de sua declaração:

```ts
x = 15; // Error: Block-scoped variable 'x' used before its declaration
let x;
```

Novamente o compilador mostra um erro, onde é apontado o uso da variável antes da sua declaração.

Agora um dos maiores pontos de confusão no `var`. Escopo baseado em função. O que acontece se pegarmos o mesmo código usado anteriormente trocando `var` por `let`?

```ts
function myFunction(): number {
  if (false) {
    let x = 15;
  }
  x = 10; // Error: Cannot find name 'x'
  return x;
}
```

Aqui é evidenciada a diferença de escopo entre `let` e `var`. No exemplo acima a variável `x` foi declarada dentro de um bloco de código (`if`), estando disponível apenas neste bloco. Isso se deve ao fato de `let` ter o escopo _por bloco_, não por função.

### A vida nem sempre é uma `const`

Assim como `let`, `const` se comporta da mesma maneira explicada no tópico anterior. Seu escopo também é por bloco, não é possível redeclaração e nem utilizá-la antes da declaração. A diferença entre os dois está na atribuição. Onde em `const` só pode ser feita uma única vez.

Por exemplo, com `let` podemos alterar o valor de uma variável indefinidamente:

```ts
let x = 10; // Iniciada com 10
x = 15; // Alterando para 15
```

Com `const`, isso não é mais possível. Uma vez criada, seu valor não pode ser alterado:

```ts
const x = 10;
x = 15; // Error: Cannot assign to 'x' because it is a constant
```

É importante ressaltar que apesar de a atribuição só poder ser realizada uma vez, `const` não torna o valor [imutável](https://segredo.dev/o-que-e-imutabilidade/). Caso o valor da variável for um objeto, suas propriedades ainda podem ser alteradas:

```ts
const person = {
  age: 23,
};
person.age = 30; // É possível alterar o valor de uma propriedade normalmente
```

Uma boa prática em programação é não reutilizar uma mesma variável para diferentes significados. Trazendo uma maior legibilidade ao código. `const` ajuda a reforçar esse conceito, por não permitir esse reuso. Com isso, podemos sempre codificar com `const`, usando `let` apenas onde for realmente necessário.

## Declaração de variáveis em Dart

Após entendermos sobre a declaração de variáveis em TypeScript, vamos abordar Dart.

### Chamando o `var`

Assim como fizemos na [sessão onde abordamos `let` em TypeScript](#let-to-the-rescue), vamos realizar os testes demonstrando as inconsistências de `var` em TypeScript. Porém agora vamos executar com Dart.

Declarando a mesma variável duas vezes:

```dart
var x = 10;
var x = 15; // Error: The name 'x' is already defined
```

Assim como em `let` para TypeScript, o compilador do Dart não deixa declarar a variável mais de uma vez.

Agora atribuindo um valor a uma variável antes de sua declaração:

```dart
x = 15; // Error: Local variable 'x' can't be referenced before it is declared
var x;
```

Novamente o compilador mostra um erro, onde é apontado o uso da variável antes da sua declaração.

Por último, o teste relacionado ao escopo de uma variável:

```dart
int myFunction() {
  if (false) {
    var x = 15;
  }
  x = 10; // Error: Undefined name 'x'
  return x;
}
```

Com esses testes, podemos ver que `var` em Dart se comporta como `let` em TypeScript. Agora vejamos `final`.

### Todo `final` é feliz?

Dart tem duas formas de variáveis _constantes_: `final` e `const`. Começando com a primeira forma, `final` em Dart é semelhante a `const` em TypeScript.

Com isso, a variável só pode ter valor atribuído uma vez:

```ts
final x = 10;
x = 15; // Error: The final variable 'x' can only be set once
```

Assim como `const` em TypeScript, `final` em Dart não torna o valor da variável imutável. Ainda é possível ser alterado como seja algum tipo complexo:

```dart
final person = {
  'age': 23,
};
person['age'] = 30;
```

### Últimas `const`atações

Nos sobrou a última forma para declaração de variáveis em Dart. `const` é mais uma forma de criar variáveis de atribuição única. Inclusive, `const` implicitamente também é `final`. Porém há uma diferença.

`const` faz o valor ser imutável em _tempo de compilação_. Com isso, o compilador garante que o valor de uma variável definida com `const` nunca seja alterado.

Para ficar mais claro, ao escrevermos o mesmo exemplo anterior com `const`, não recebemos qualquer erro durante a digitação:

```dart
const person = {
  'age': 23,
};
person['age'] = 30;
```

Porém ao executar, o compilador dispara um erro: _Unsupported operation: Cannot modify unmodifiable Map_. Nos mostrando que tentamos alterar um valor não modificável.

Podemos dizer então que `const` em Dart garante [Imutabilidade](https://segredo.dev/o-que-e-imutabilidade/)!

> Para saber mais sobre esses conceitos, veja o [Language Tour de Dart](https://dart.dev/guides/language/language-tour#variables).

## Conclusão

Para concluir, podemos resumir:

- Nunca usar `var` em TypeScript
- `var` em Dart é igual a `let` em TypeScript
- `final` em Dart é igual a `const` em TypeScript
- `const` em Dart garante imutabilidade em tempo de compilação

Até o próximo artigo!
