---
title: TypeScript vs Dart - Interfaces
published: true
description: Diferenças da utilização de interfaces entre TypeScript e Dart
tags: typescript, javascript, dart, flutter
series: TypeScript vs Dart
---

Nesse artigo falaremos brevemente sobre a utilização de interfaces em TypeScript e como Dart provê a mesma funcionalidade.

- [TypeScript](#typescript)
- [Dart](#dart)
- [Bônus](#bônus)
- [Conclusão](#conclusão)

## TypeScript

Assim como eu muitas linguagens, TypeScript possui suporte a [interfaces](https://pt.wikipedia.org/wiki/Interface_(programa%C3%A7%C3%A3o_orientada_a_objetos)). Uma funcionalidade muito utilizada para criarmos contratos onde há a comunicação entre dois ou mais _componentes de software_.

Para exemplificar, vamos criar uma função em TypeScript. Essa função irá receber um nome e um sobrenome. E retornará o _nome inteiro_:

```ts
function joinNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
const fullName = joinNames('Wiley', 'Marques');
console.log(fullName); // 'Wiley Marques'
```

> [Abrir no TypeScript Playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAKzjMA5AhgWwKYDOAFMDAE4FTb4BcilZ6A5gDSIA2Wl1edDzASj5RGYJogDeAKESIyeKCDJIABgBIJpClVx4Avog2duuvSoDcUvVIgJKiUO3Y9EAXhRpMu4gHIA6jDseACePmw+ALJYZACOIIQ+Apa2YARwQQB07HBMJCBOPElAA)

Agora, para exemplificar o uso de uma interface, vamos alterar o recebimento de parâmetros na função. Ao invés de receber `firstName` e `lastName`, vamos passar a receber um objeto contendo essas duas propriedades.

Para isso, criaremos a interface `Person` com essas propriedades. Alteraremos a função para receber um objeto com o tipo sendo a interface. E alteraremos a forma de executar a função passando um objeto condizente com a interface:

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const fullName = joinNames({
  firstName: 'Wiley',
  lastName: 'Marques',
});

console.log(fullName); // 'Wiley Marques'
```

> [Abrir no TypeScript Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQIwAriARhgOZACssoARAwAKAA6YcjdORwBKIWBYhW+LlAhgpUXAAMAJHl1GQAOlLkqtCFFkNw9sb15+ANEnMQkEHAoSKW5udWQAXmVVEHUtQmJfSMFkAHIAdWBuCABPEoAaLgj-YpKAWTgoAEcpDXqCUWNOAniQbCqvbixWTWkU9UGCIA)

Criamos a interface e fizemos a função `joinNames` recebê-la como parâmetro. Mas interfaces não são usadas apenas para definir as assinaturas de funções. Também são usadas para definir um contrato a ser seguido por classes em um software. Então vamos modificar o exemplo acima para demonstrar essa utilização.

Criaremos uma classe de nome `Wiley` para realizar a criação de um objeto. Como o objeto será usado como parâmetro para a função `joinNames`, ele deverá respeitar o _contrato_ (ou interface) `Person`. Portanto teremos de _implementar_ a interface `Person` na classe `Wiley` e definir propriedades correspondentes às esperadas pela interface. Tendo o seguinte código:

```ts
interface Person {
  firstName: string;
  lastName: string;
}

class Wiley implements Person { // Implementando a interface `Person`

  // Definindo as propriedades requeridas na interface
  public firstName: string = 'Wiley';
  public lastName: string = 'Marques';

  // Podemos adicionar qualquer outra propriedade
  public hasChildren: boolean = true;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const wiley = new Wiley(); // Criando um objeto `Wiley`
const fullName = joinNames(wiley); // Passando `wiley` para a função

console.log(fullName);
```

> [Abrir no TypeScript Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQIJeGDMgDqwbhACeyYDQAOSuuFnpyOfMgD0x5AElN2iODggAJlmRw14aPCTIABvuwgvEsSmyAAiEKQgoI7OshpQWHHAEPZw9hCyUBAAjgCu0MApsiAuoJCwiBBcGjkARtzACCRk-LQMTGAsIKzIALzIAOQKSsr9nMTVdQ08fFStQh1svQMAsnBQuemjgSZmqFhpNFiyqQ3AOGvIuXDcG1DIWDkdLnEJLMmpleO19Y0AFnwAYV+insmRAjBqWCwSjsSw6eTEEhgORACDAZ1wACssKABOkABQaTA4Ri+HAASnmnW6hGImTAOSguC8ABI8ESDCAAHSkcizOiiZBsjl+LnSfkQUReRGSHAUZAAd0UKiWIAgCvkyuU+PJ7B2yABLDs0RyNHuNUxEDATi8QxUAQQcrAJBy3G4eKW2NxrQw+KVw11+tQfAwxpt-vtyA0axcLmRIAA5wBjrASR0gbBKMVYVj45FuvG6oA)

Como podemos ver, apesar de o objeto `wiley` ser do tipo `Wiley`, podemos utilizá-lo como parâmetro para a função `joinNames`. Isso se deve ao fato de a classe `Wiley` implementar a interface `Person` e a função `joinNames` estar preparada para receber qualquer objeto que implemente `Person`.

## Dart

Agora vejamos como Dart funciona nesse quesito.

Dart possui uma extensa documentação sobre todas as funcionalidades disponíveis na linguagem. Essa documentação pode ser vista em: [A tour of the Dart language](https://dart.dev/guides/language/language-tour). Lá podemos ver que em Dart não existe uma forma explícita para criação interfaces. A alternativa ofertada pela linguagem é a utilização de [_Classes Abstratas_](https://dart.dev/guides/language/language-tour#abstract-classes).

Em Dart, existe um conceito chamado de [_Interface Implícita_](https://dart.dev/guides/language/language-tour#implicit-interfaces). Basicamente, qualquer classe também é implicitamente uma interface! Portanto, qualquer classe (abstrata ou não) pode ser _implementada_ por outra quando necessário.

Indo ao código e seguindo a recomendação da documentação, a classe abstrata `Person` ficaria assim:

```dart
abstract class Person {
  String get firstName;
  String get lastName;
}
```

> Um ponto a se notar aqui é que, além de usarmos uma classe abstrata, foi necessário um [`getter`](https://dart.dev/guides/language/language-tour#getters-and-setters) ao invés de uma simples propriedade.

Agora, continuando o exercício, vamos converter o último exemplo da sessão anterior para Dart. Ficando com o seguinte código:

```dart
abstract class Person {
  String get firstName;
  String get lastName;
}

class Wiley implements Person { // Classe `Wiley` implementando classe `Person`
  String firstName = 'Wiley';
  String lastName = 'Marques';
  bool hasChildren = true;
}

String joinNames(Person person) {
  return '${person.firstName} ${person.lastName}';
}

void main() {
  final wiley = new Wiley();
  final fullName = joinNames(wiley);
  print(fullName);
}
```

> [Abrir no Dart Pad](https://dartpad.dev/94c64482c553e8a769e9154b77eff90a)

Assim temos uma _Classe Abstrata_ sendo utilizada como uma _definição de contrato_.

## Bônus

Vamos acrescentar uma curiosidade interessante. Em TypeScript, as classes também possuem interfaces implícitas! Com isso, também é possível definir uma classe abstrata e a utilizarmos como um contrato, semelhante a como fizemos em Dart.

Em código, a classe abstrata ficaria assim:

```ts
abstract class Person {
  abstract get firstName(): string;
  abstract get lastName(): string;
}
```

E o exemplo inteiro seria:

```ts
abstract class Person {
  abstract get firstName(): string;
  abstract get lastName(): string;
}

class Wiley implements Person {
  public firstName: string = 'Wiley';
  public lastName: string = 'Marques';
  public hasChildren: boolean = true;
}

function joinNames(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

const wiley = new Wiley();
const fullName = joinNames(wiley);

console.log(fullName);
```

> [Abrir no TypeScript Playground](https://www.typescriptlang.org/play?#code/IYIwzgLgTsDGEAJYBthjAgCgUymA9gHYIDeAUAgqJDPAgObaIBmAlnhAHLAC22AFAEoAXAhqtC9ANwUq4aHESNEqSNz5DR4yTIC+ZMijQYA6q2TYAnglY8ADhb6EIGHHiKlZdgK4hkrWAQ2DnVsLWgJegQAXgQAcjMLSziZSh8-AIRVLl4wsQjJGPiAWWAoAEdvbDAUr19-QIALNABhRvMAEyhsQlEQfHwLYGJY6Cq9A2ZvQnhWDwArfAlQsH47XAJerA2iEXyoSM9KbohvKGIAAwASEnX3QgA6YLVc3QQbu82H7NDdC4nDERIAgAO7mKxFQjYEEIRJWIQyWBAljeZDIUJFRbLXKrMFJQQyQGEAgWb74ej8KZo0IEoA)

Ou seja, TypeScript dá suporte às duas formas!

## Conclusão

Vimos como implementar interfaces em TypeScript e qual a alternativa proposta por Dart. Além de vermos como TypeScript oferece o mesmo suporte a interfaces implícitas presentes em Dart.

Nos próximos artigos, veremos outras comparações. Obrigado. E até logo!
