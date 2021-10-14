---
title: TypeScript vs Dart - Coleções iteráveis
published: false
description: Diferenças entre coleções iteráveis em TypeScript e Dart
tags: typescript, javascript, dart, flutter
series: TypeScript vs Dart
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

Ambas as linguagens (Dart e TypeScript) tem implementações nativas para criação de coleções iteráveis. Em ambas, esse tipo é chamado de `Iterable`. Cada uma, obviamente, possui uma implementação diferente, mas ambas tem o mesmo objetivo e funções similares.

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
final numbers = [1, 2, 3, 4, 5];
```

Em TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
```

Novamente a sintaxe é praticamente a mesma. Porém ambas possuem outras formas para criação de listas, mas essa sintaxe é, além de muito simples, a mais utilizada e cobre a maioria dos cenários.

## Adicionando itens

Com as listas de números criadas, vamos adicionar novos elementos.

Em Dart:

```dart
final numbers = [1, 2, 3, 4, 5];
numbers.add(6);
```

Em TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
numbers.push(6);
```

Nesse exemplo já podemos ver uma diferença nas linguagens. Em Dart, usamos o método `add` de uma lista para inserir novos elementos. Em TypeScript, usamos o método `push`.

## Obtendo itens específicos

É muito comum precisarmos obter itens específicos em uma lista. Como, por exemplo, o quinto item. Novamente, a implementação nas duas linguagens é bastante semelhante. Basta informarmos o *índice* (ou localização) do item ao referenciarmos a lista.

Em Dart:

```dart
final numbers = [1, 2, 3, 4, 5];
final secondItem = numbers[2]; // 3
```

Em TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
const secondItem = numbers[2]; // 3
```

Com isso podemos obter qualquer item da lista. Sendo, por exemplo, possível obter o primeiro item.

```dart
final numbers = [1, 2, 3, 4, 5];
final firstItem = numbers[0]; // 1
```

Em TypeScript:

```typescript
const numbers = [1, 2, 3, 4, 5];
const firstItem = numbers[0]; // 1
```

Porém, para obter o último item em TypeScript requer que saibamos o tamanho da lista e substrair 1 (um). A subtração se deve ao fato do posicionamento começar com 0. Por exemplo, em uma lista de 5 elementos o último item estaria no índice 4.

Com isso, a lógica em TypeScript seria:

```typescript
const numbers = [1, 2, 3, 4, 5];
const listLength = numbers.length;
const lastItemIndex = listLength - 1;
const lastItem = numbers[lastItemIndex]; // 5
```

Já em Dart, possuímos uma vantagem de a própria linguagem fornecer uma solução mais simples. Toda lista possui uma propriedade chamada `first` e outra chamada `last`. As duas retornam o primeiro e o último item, respectivamente.

Com essa facilidade, a lógica para obter o último item seria:

```dart
final numbers = [1, 2, 3, 4, 5];
final lastItem = numbers.last; // 5
```

Sendo igualmente simples obter o primeiro item:

```dart
final numbers = [1, 2, 3, 4, 5];
final firstItem = numbers.first; // 5
```

## Removendo itens

A remoção de itens presentes em listas é possível em ambas linguagens. Contudo, Dart possui mais uma vantagem sobre TypeScript. Isso porque TypeScript não provê um método específico para remoção de um item, mas um método para remoção de um ou mais itens.

Em TypeScript temos o método `splice`. Esse método pode receber (além de outras coisas) dois parâmetros para sua execução. O primeiro sendo o índice do elemento a ser removido e o segundo se refere a quantos elementos serão removidos a partir desse referenciado pelo índice.

Com isso, quando quisermos remover o item na posição 2 da lista devemos não só informar o valor `2` como parâmetro, mas também o valor `1` no segundo parâmetro. Exemplo:

```typescript
const numbers = [1, 2, 3, 4, 5];
numbers.splice(2, 1);
```

Já em Dart, basta usarmos o método `removeAt` informando o índice do item a ser removido:

```dart
final numbers = [1, 2, 3, 4, 5];
numbers.removeAt(2);
```

## Iterando sequencialmente nos elementos

## Verificando a existência de um item específico

## Filtrando itens

## Conclusão

## Referências

- Referências
- https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://api.dart.dev/stable/2.14.4/dart-core/Iterable-class.html
- https://api.dart.dev/stable/2.14.4/dart-core/List-class.html
