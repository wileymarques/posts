---
title: TypeScript vs Dart - Coleções iteráveis
published: true
description: Diferenças entre coleções iteráveis em TypeScript e Dart
tags: typescript, javascript, dart, flutter
series: TypeScript vs Dart
cover-image: assets/ts-vs-dart-colecoes-iteraveis-cover.png
---

- [O que são coleções iteráveis](#o-que-são-coleções-iteráveis)
- [Criando uma lista](#criando-uma-lista)
- [Adicionando itens](#adicionando-itens)
- [Obtendo itens específicos](#obtendo-itens-específicos)
- [Removendo itens](#removendo-itens)
- [Iterando sequencialmente nos elementos](#iterando-sequencialmente-nos-elementos)
- [Verificando a existência de um item específico](#verificando-a-existência-de-um-item-específico)
- [Filtrando itens](#filtrando-itens)
- [Conclusão](#conclusão)
- [Referências](#referências)

## O que são coleções iteráveis

Coleções são, em resumo, uma representação de um grupo de objetos. Uma coleção iterável é um tipo de coleção onde pode-se iterar nos elementos. Em outras palavras, são coleções onde podemos *navegar* nos seus elementos.

Ambas as linguagens (Dart e TypeScript) tem implementações nativas para criação de coleções iteráveis. Em ambas, esse tipo é chamado de `Iterable`. Cada uma, obviamente, possui uma implementação diferente, mas ambas têm o mesmo objetivo e funções similares.

Os tipos mais comuns de coleções iteráveis são: `Lists` (ou `Arrays`), `Maps` e `Sets`. Nesse artigo, veremos especificamente `Lists` em Dart e `Arrays` em TypeScript, por serem o tipo mais básico de coleções. Os outros iteráveis serão visitados em artigos futuros.

## Criando uma lista

Lista é o nome em português comumente usado quando falamos de `Arrays` ou `Lists`. E usaremos esse nome ao longo desse artigo.

Vamos começar criando uma lista vazia (ou sem elementos) em cada linguagem.

Em Dart:

```dart
final emptyList = [];
```

Em TypeScript:

```typescript
const emptyList = [];
```

Como podemos ver, a sintaxe é praticamente a mesma. Agora vamos criar uma lista já inicializada com alguns números.

Em Dart:

```dart
final list = [1, 2, 3, 4, 5];
```

Em TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
```

Novamente a sintaxe é praticamente a mesma. Porém ambas possuem outras formas para criação de listas, mas essa sintaxe é, além de muito simples, a mais utilizada e cobre a maioria dos cenários.

## Adicionando itens

Com as listas de números criadas, vamos adicionar novos elementos.

Em Dart:

```dart
final list = [1, 2, 3, 4, 5];
list.add(6);
```

Em TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
list.push(6);
```

Nesse exemplo já podemos ver uma diferença nas linguagens. Em Dart, usamos o método `add` de uma lista para inserir novos elementos. Em TypeScript, usamos o método `push`.

## Obtendo itens específicos

É muito comum precisarmos obter itens específicos em uma lista. Como, por exemplo, o quinto item. Novamente, a implementação nas duas linguagens é bastante semelhante. Basta informarmos o *índice* (ou localização) do item ao referenciarmos a lista.

Em Dart:

```dart
final list = [1, 2, 3, 4, 5];
final secondItem = list[2]; // 3
```

Em TypeScript:

```typescript
const list = [1, 2, 3, 4, 5];
const secondItem = list[2]; // 3
```

Com isso podemos obter qualquer item da lista. Sendo, por exemplo, possível obter o primeiro item.

```dart
final list = [1, 2, 3, 4, 5];
final firstItem = list[0]; // 1
```

Em TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
const firstItem = numbers[0]; // 1
```

Porém, para obter o último item em TypeScript requer que saibamos o tamanho da lista e subtrair 1 (um). A subtração se deve ao fato de o posicionamento começar com 0. Por exemplo, em uma lista de 5 elementos o último item estaria no índice 4.

Com isso, a lógica em TypeScript seria:

```typescript
const list = [1, 2, 3, 4, 5];
const listLength = list.length;
const lastItemIndex = listLength - 1;
const lastItem = list[lastItemIndex]; // 5
```

Já em Dart, possuímos uma vantagem de a própria linguagem fornecer uma solução mais simples. Toda lista possui uma propriedade chamada `first` e outra chamada `last`. As duas retornam o primeiro e o último item, respectivamente.

Com essa facilidade, a lógica para obter o último item seria:

```dart
final list = [1, 2, 3, 4, 5];
final lastItem = list.last; // 5
```

Sendo igualmente simples obter o primeiro item:

```dart
final list = [1, 2, 3, 4, 5];
final firstItem = list.first; // 5
```

## Removendo itens

A remoção de itens presentes em listas é possível em ambas linguagens. Contudo, Dart possui mais uma vantagem sobre TypeScript. Isso porque TypeScript não provê um método específico para remoção de um item, mas um método para remoção de um ou mais itens.

Em TypeScript temos o método `splice`. Esse método pode receber (além de outras coisas) dois parâmetros para sua execução. O primeiro sendo o índice do elemento a ser removido e o segundo se refere a quantos elementos serão removidos a partir desse referenciado pelo índice.

Com isso, quando quisermos remover o item na posição 2 da lista devemos não só informar o valor `2` como parâmetro, mas também o valor `1` no segundo parâmetro. Exemplo:

```typescript
const list = [1, 2, 3, 4, 5];
list.splice(2, 1);
```

Já em Dart, basta usarmos o método `removeAt` informando o índice do item a ser removido:

```dart
final list = [1, 2, 3, 4, 5];
list.removeAt(2);
```

## Iterando sequencialmente nos elementos

Agora veremos como realizar uma das tarefas mais básicas, e talvez mais usadas, ao lidarmos com listas: Iterar.

Nesse quesito, ambas as linguagens possuem sintaxes muito similares. Ambas possuem diversas funções para realizar essa operação, incluindo o famoso `for` e métodos mais *complexos* como o `map`. Porém, veremos a mais simples de usar em casos corriqueiros.

Começando com Dart, temos o `for..in`. Onde, no *corpo* da instrução (entre as chaves - `{` e `}`) podemos fazer a operação que desejamos em cada `item`:

```dart
final list = [1, 2, 3, 4, 5];
for (final item in list) {
  print(item);
}
```

Em TypeScript também temos disponível a instrução `for..in`:

```typescript
const list = [1, 2, 3, 4, 5];
for (const item in list) {
  console.log(item);
}
```

Mas o comportamento dela é bem diferente do imaginado. Ao invés de a variável `item` vir preenchida com o valor do elemento, vem com o *índice* deste. Portanto, o correto a ser utilizado nesse caso é a instrução `for..of`:

```typescript
const list = [1, 2, 3, 4, 5];
for (const item of list) {
  console.log(item);
}
```

## Verificando a existência de um item específico

Não é incomum termos de iterar em uma lista para verificar se um determinado item está presente. Como no exemplo em TypeScript onde verificamos se existe algum item maior do que 3:

```typescript
const list = [1, 2, 3, 4, 5];
const hasItemGreaterThanThree = false;
for (const item of list) {
  if (item > 3) {
    hasItemGreaterThanThree = true;
  }
}
```

Contudo, dependendo da lista, essa operação pode ser bastante trabalhosa e pouco performática. Para isso temos métodos específicos. Em Dart temos o método `any`, onde podemos passar um *predicado* como parâmetro a ser utilizado como condição:

```dart
final list = [1, 2, 3, 4, 5];
final hasItemGreaterThanThree = list.any((item) => item > 3);
```

Em TypeScript, temos o método `some`:

```typescript
const list = [1, 2, 3, 4, 5];
const hasItemGreaterThanThree = list.some((item) => item > 3);
```

Esses métodos são altamente recomendados porque não precisam iterar a lista inteira. Ao encontrar o primeiro item que satisfaça a condição, a execução é interrompida e `true` é retornado.

## Filtrando itens

Além de verificar se um item existe na lista, iterar em uma lista também pode ser útil para obtermos itens de acordo com certa condição. No exemplo, em Dart, estamos adicionando a uma nova lista chamada `itemsLessThanThree` os itens com valor menos a 3:

```dart
final list = [1, 2, 3, 4, 5];
final itemsLessThanThree = [];
for (final item in list) {
  if (item < 3) {
    itemsLessThanThree.add(item);
  }
}
```

Mas, novamente, temos funções mais apropriadas para isso. Em Dart temos o método `where`:

```dart
final list = [1, 2, 3, 4, 5];
final itemsLessThanThree = list.where((item) => item < 3);
```

E, em TypeScript, temos o método `filter`:

```typescript
const list = [1, 2, 3, 4, 5];
const itemsLessThanThree = list.filter((item) => item < 3);
```

## Conclusão

Com isso finalizamos nossa simples comparação entre TypeScript e Dart ao lidarmos com coleções iteráveis. Onde podemos ver algumas vantagens do Dart nesse quesito.

Existem mais funcionalidades que podem ser exploradas para nos ajudar no dia-a-dia. Algumas dessas podem ser conferidas na sessão [Referências](#referências).

Obrigado. E até o próximo artigo!

## Referências

- [DartPad](https://dart.dev/#try-dart)
- [TypeScript Playground](https://www.typescriptlang.org/)
- [Iterators and Generators - TypeScript Handbooks](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)
- [Iterable collections - Dart codelabs](https://dart.dev/codelabs/iterables)
- [Array em JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
