---
title: Angular Elements - Implementação Básica
published: true
description: Implementação Básica de Angular Elements. Criando um Custom Element que contém interação com uma aplicação Angular comum.
tags: angular, web-components, angular-elements, micro-front-ends
series: Angular Elements
---

Após a [explicação do conceito envolvendo Angular Elements (incluindo referências)](https://dev.to/wilmarques/angular-elements-introducao-351n), vamos implementar um componente simples.

## O que será feito

O Angular, por ser um framework, traz diversas capacidades incluídas no seu pacote. Uma delas é a [Angular CLI](https://angular.io/cli/), capaz de criar projetos, trechos de código e ter outras responsabilidades.

Com a Angular CLI, criaremos um projeto e o converteremos para Angular Elements. Onde teremos como base o exemplo disponível no [tutorial do Angular, Tour of Heroes](https://angular.io/tutorial).

Porém, para simplificar o processo, criaremos apenas a listagem e adição de heróis, não o dashboard. Nesse exemplo, uma aplicação Angular comum terá a responsabilidade de inclusão dos heróis, enquanto um Angular Elements exibirá a listagem.

Ilustração do que será construído:

![Ilustração da listagem de heróis](assets/heroes-list-example.png)

## Configuração do ambiente

Antes de tudo, devemos ter um ambiente corretamente configurado para o processo ocorrer conforme o esperado.

### Node e NPM

A opção padrão para instalação do Node é utilizar o instalador oficial, disponível no site da própria ferramenta: <https://nodejs.org/>.

É altamente recomendada a instalação de uma versão LTS (Long Time Support), por ser mais  estável. A versão _current_ (ou atual) é quase como uma versão _beta_, onde novas funcionalidades são testadas e é esperado um feedback da comunidade para trazer maior estabilidade na próxima LTS.

Contudo, uma ótima opção para realizar a instalação é usar algum gerenciador como [NVM](https://github.com/nvm-sh/nvm) ou [NVS](https://github.com/jasongin/nvs). A vantagem em usar um gerenciador é a facilidade de atualização e possibilidade em se ter diferentes versões do Node em um mesmo equipamento.

Utilizando o NVS, para instalar a versão LTS do Node basta executar os seguintes comando no terminal:

```bash
nvs add lts
nvs use lts
```

E para verificar a instalação, pode-se executar um comando para a CLI do Node retornar a versão atualmente instalada. Como abaixo:

![Executando `node -v` no Terminal](assets/node-v.png)

### Angular CLI

Após instalar corretamente o Node, podemos instalar a Angular CLI. Bastando executar o seguinte no terminal:

```bash
npm install -g @angular/cli
```

Tendo um resultado semelhante ao abaixo:

![Instalando Angular CLI como uma dependência global no npm](assets/npm-install-angular-cli.png)

## Criação do projeto

### Workspace

A CLI do Angular possibilita a criação de diversos projetos dentro de um mesmo [workspace](https://angular.io/guide/glossary#workspace), para simplificar a criação de [monorepos](https://www.atlassian.com/git/tutorials/monorepos).

Para usufruirmos dessa funcionalidade, iniciaremos com a criação de um workspace limpo (sem projetos) utilizando o comando [`ng new`](https://angular.io/cli/new) e o parâmetro `--createApplication` com o valor `false`.

```bash
ng new ng-elements --createApplication=false
```

### Aplicação inicial

Após o workspace ser criado, entraremos nele e adicionaremos uma aplicação simples com o comando `ng generate application`:

```bash
cd ng-elements
ng generate application heroes-creator --prefix=hc --minimal --routing=false --style=scss
```

Como pode-se ver, é possível usar parâmetros no comando `generate` para configurar como queremos a aplicação. Nesse caso, além do nome da aplicação (`heroes-creator`), informamos o prefixo `hc` ao invés de usar o padrão `app` (`prefix=hc`), a não criação de testes (`minimal=true`), sem roteamento (`routing=false`) e SCSS como padrão de estilização (`style=scss`).

A execução do comando `ng generate` criará uma pasta _projects_, adicionará o projeto de nome _heroes-creator_ e alterará o arquivo `angular.json` com uma configuração para esse projeto especificamente.

Também modificará o arquivo `package.json` adicionando as dependências necessárias para a sua execução e as instalará.

Além disso, esse novo projeto passará a ser o padrão para qualquer comando executado neste workspace. Esse ponto também é importante salientar, pois quando tivermos mais projetos nesse workspace será necessário informar ao Angular em qual devem ser executados os comandos.

### Executando a aplicação

Após a aplicação ser criada, podemos executá-la com o seguinte comando:

```bash
ng serve
```

Tendo o seguinte resultado:

![Resultado ng serve](assets/ng-serve-new-application.png)

E, em seguida, podemos abrir o endereço <http://localhost:4200/> no navegador e ver a aplicação em execução:

![Exemplo da aplicação exemplo em execução](assets/ng-serve-new-application-opening-in-browser.png)

## Criação de heróis

### Componente principal

Agora que já temos uma aplicação funcional, podemos começar a alterá-la.

Como qualquer aplicação Angular, o código dessa aplicação reside no diretório _src_. Porém, como iniciamos com a criação de um workspace, as aplicações criadas nele ficam localizadas na pasta _projects_. Com isso, podemos encontrar nossa aplicação em *projects/heroes_creator/src*. Como a seguir:

![Estrutura de diretórios da aplicação inicial](assets/heroes-creator-folder-structure.png)

No diretório _src/app_ podemos encontrar o componente (`app.component.ts`) e módulo (`app.module.ts`) principais:

![Componente principal da aplicação](assets/heroes-creator-folder-structure-main-module-component.png)

Então comecemos o projeto apagando todo o conteúdo do módulo principal (`app.module.ts`) e alterando para:


```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

E o conteúdo do arquivo `app.component.ts` para:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

}
```

No código acima, podemos ver a referência a um componente ainda não existente: `hc-creator`. Pois o criaremos agora, novamente utilizando a Angular CLI:

```bash
ng generate component creator --inlineStyle --inlineTemplate --skipTests --flat
```

Como dito anteriormente, o comando `generate` recebe parâmetros. Neste caso, solicitamos a criação de um componente (`component`) com o nome `creator`, com o estilo e template no mesmo arquivo (`inlineStyle` e `inlineTemplate`), sem testes (`skipTests`) e direto no diretório raiz do projeto (`flat`).

Após esse componente ser criado, mudaremos o conteúdo do seu arquivo (`creator.component.ts`) para:

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hc-creator',
  template: `
    <div>
      <label>Hero name:
        <input #heroName />
      </label>
      <button (click)="add(heroName.value); heroName.value=''">
        add
      </button>
    </div>
  `,
  styles: [`
    button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      cursor: hand;
      font-family: Arial;
    }

    button:hover {
      background-color: #cfd8dc;
    }
  `]
})
export class CreatorComponent {

  @Output() newHero = new EventEmitter<string>();

  add(heroName: string): void {
    if (heroName) {
      this.newHero.emit(heroName);
    }
  }

}
```

Com isso, podemos executar o projeto (`ng serve`) e visualizar o resultado no navegador:

![Resultado após a criação do componente principal](assets/create-heroes-component-result.png)

### Lista de heróis

Finalmente podemos chegar no assunto do artigo: [Angular Elements](https://angular.io/guide/elements). Criaremos um novo projeto contendo um componente, o qual receberá por parâmetro (`Input`) a lista de heróis contida no componente principal e a exibirá conforme a ilustração apresentada no início do artigo.

Começamos criando um novo projeto no workspace, porém dessa vez criaremos uma [biblioteca](https://angular.io/guide/libraries) (`library`). Daremos a ela o nome de `heroes-visualizer` e definiremos seu prefixo (`prefix`) como `hv`, a fim de diferenciar dos componentes da aplicação principal:

```bash
ng generate library heroes-visualizer --prefix=hv
```

Após a execução do comando acima, o projeto será criado na pasta _projects_ e o arquivo _angular.json_ será modificado adicionando uma nova configuração específica para ele. Como ilustrado a seguir:

![Estrutura de pastas após a criação do projeto visualizer](assets/folder-structure-heroes-visualizer.png)

A CLI do Angular ainda não nos dá opção de gerar bibliotecas com uma configuração mínima, semelhante ao que fizemos com a aplicação inicial. Portanto vamos excluir os seguintes arquivos desnecessários:

- projects/heroes-visualizer/src/lib/heroes-visualizer.component.spec.ts
- projects/heroes-visualizer/src/lib/heroes-visualizer.service.ts
- projects/heroes-visualizer/src/lib/heroes-visualizer.service.spec.ts

> Como não realizaremos qualquer tipo de teste, poderíamos excluir os arquivos `karma.conf.js` e `src/test.ts`, além de remover a [configuração para execução de testes](https://angular.io/guide/workspace-config#configuring-builder-targets).
>
> Porém em nada atrapalharão e não nos preocuparemos para não prolongar o artigo.

> Como utilizo Linux, executo o seguinte comando no [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) para excluir os arquivos:
>
> `rm -rf projects/heroes-visualizer/src/lib/heroes-visualizer.service.ts projects/heroes-visualizer/src/lib/*.spec.ts`
>
> Caso utilize outro Sistema Operacional, o comando pode variar.

Após a exclusão desses arquivos, vamos alterar o conteúdo do arquivo _public-api.ts_ presente no diretório _projects/heroes-visualizer/src/_ para não mais referenciar o service excluído:

```diff
/*
 * Public API Surface of heroes-visualizer
 */

-export * from './lib/heroes-visualizer.service';
export * from './lib/heroes-visualizer.component';
export * from './lib/heroes-visualizer.module';
```

Em seguida, utilizaremos o componente `hv-heroes-visualizer` dessa biblioteca na aplicação criada anteriormente (`heroes-creator`). Para isso, precisamos importar o módulo dessa biblioteca na aplicação e referenciar o componente onde queremos exibí-lo.

Começamos importando o módulo da biblioteca (`HeroesVisualizerModule`) no módulo principal da aplicação (_projects/heroes-creator/src/app/app.module.ts_):

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

+import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
+   HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

E referenciando o componente `hv-heroes-visualizer` no componente principal da aplicação (_projects/heroes-creator/src/app/app.component.ts_):

```diff
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>
+   <hv-heroes-visualizer></hv-heroes-visualizer>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

}
```

Com isso, podemos executar o projeto (`npm start`). Mas imediatamente podemos ver alguns erros acontecendo durante a inicialização do projeto, como:

![Terminal mostrando erros reportados pela Angular CLI dizendo que a biblioteca `heroes-visualizer` não foi encontrada](assets/heroes-visualizer-library-not-found-terminal-error.png)

Isso acontece porque, apesar de estar no mesmo workspace, a `heroes-visualizer` ainda é uma biblioteca. Por padrão, o Angular tentará usar a biblioteca como se fosse uma externa, mas não a encontrará porque em nenhum momento a instalamos.

Para funcionar, deveríamos compilar a `heroes-visualizer` antes de executar o projeto e a instalar com as maneiras convencionais do _npm_.

Mas existe uma alternativa em projetos utilizando TypeScript, que é o caso do Angular, onde podemos indicar ao seu compilador onde procurar bibliotecas específicas. Essa configuração é realizada no arquivo _tsconfig.json_.

Abrindo o arquivo _tsconfig.json_ podemos ver uma propriedade `paths` com o caminho da biblioteca `heroes-visualizer` sendo apontado para `dist`:

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  ...
    "paths": {
      "heroes-visualizer": [
        "dist/heroes-visualizer/heroes-visualizer",
        "dist/heroes-visualizer"
      ]
    },
  ...
}
```

Dessa forma, bastaria compilarmos a biblioteca com o comando `ng build heroes-visualizer` e a pasta _dist_ seria gerada:

![Comando `ng build heroes-visualizer` sendo executado no Terminal, com o resultado positivo da compilação](assets/ng-build-heroes-visualizer.png)

Com o código compilado dentro desse diretório:

![Arquivos gerados pelo comando `ng build heroes-visualizer` sendo mostrados no VSCode](assets/ng-build-heroes-visualizer-dist-result.png)

Isso feito, poderíamos executar o projeto (`npm start`) e teríamos uma execução com sucesso:

![Terminal mostrando sucesso da execução do comando `npm start`](assets/npm-start-positivo-result-after-build-heroes-visualizer.png)



//: TODO mudar caminho da lib no tsconfig para apontar para pasta não compilada

Assim, podemos executar o projeto para verificar o resultado no navegador, mas antes precisamos [compilar a biblioteca](https://angular.io/guide/creating-libraries#using-your-own-library-in-apps) com o comando:

```bash
ng build heroes-visualizer
```

Dessa forma, ao executar o projeto (`ng serve`) temos o seguinte resultado no navegador:

![Exemplo da aplicação utilizando o componente visualizer](assets/aplicacao-visualizer-execucao.png)

Agora vamos modificar alguns arquivos para transferir a exibição dos heróis para o componente `hv-heroes-visualizer`, além de já implementarmos uma funcionalidade de remoção de determinados heróis.

Primeiramente, altere o conteúdo do arquivo `projects/heroes-visualizer/src/lib/heroes-visualizer.component.ts` para:

```ts
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'hv-heroes-visualizer',
  template: `
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <span class="badge">{{hero.id}}</span>
        <span class="hero-name">{{ hero }}</span>
        <button class="delete" title="delete hero"
          (click)="delete(hero)">x</button>
      </li>
    </ul>
  `,
  styles: [`
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      position: relative;
      cursor: pointer;
      background-color: #EEE;
      margin: .5em;
      padding: .5em 0 .3em 1em;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }

    .heroes span.hero-name {
      color: #333;
      position: relative;
      display: block;
      width: 250px;
    }
    .heroes span.hero-name:hover {
      color:#607D8B;
    }

    button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      cursor: hand;
      font-family: Arial;
    }
    button.delete {
      position: relative;
      left: 174px;
      top: -23px;
      background-color: gray !important;
      color: white;
    }
  `]
})
export class HeroesVisualizerComponent {

  @Input() heroes: Array<string>;

  @Output() deleteHero = new EventEmitter<string>();

  delete(heroName: string): void {
    if (heroName) {
      this.deleteHero.emit(heroName);
    }
  }

}
```

Do arquivo `projects/heroes-visualizer/src/lib/heroes-visualizer.module.ts` para:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesVisualizerComponent } from './heroes-visualizer.component';

@NgModule({
  declarations: [HeroesVisualizerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [HeroesVisualizerComponent],
})
export class HeroesVisualizerModule { }
```

Do arquivo `projects/heroes-creator/src/app/app.component.ts` para:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <hv-heroes-visualizer [heroes]="heroes" (deleteHero)="deleteHero($event)"></hv-heroes-visualizer>
  `,
})
export class AppComponent {

  heroes: Array<string> = [];

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

  deleteHero(heroToDelete: string): void {
    this.heroes = this.heroes.filter((hero: string) => {
      return hero !== heroToDelete;
    });
  }

}
```

E do arquivo `projects/heroes-creator/src/app/app.module.ts` para:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Agora podemos compilar novamente a biblioteca (`ng build heroes-visualizer`) e executar o projeto principal (`ng serve`), tendo o seguinte resultado:

![Resultado da execução após conclusão da listagem dos heróis](assets/resultado-finalizacao-listagem-herois.png)

## Convertendo lista de heróis em Angular Elements

Até agora, criamos um projeto principal sendo uma aplicação Angular _comum_ e uma _bibliote
ca de componentes_ onde a listagem dos heróis está contida.

Porém até o momento, não temos qualquer utilização de Angular Elements em qualquer desses p
rojetos. E será isso que faremos agora, convertendo a biblioteca `heroes-visual
izer` em Angular Elements.

Primeiramente, devemos adicionar o suporte a Angular Elements ao projeto principal, já que ele será o responsável por exibir o componente exportado como tal. Para isso, basta executar o comando:

```bash
ng add @angular/elements
```

Esse comando adiciona o [polyfill de Custom Elements](https://github.com/WebReflection/document-register-element) e o pacote [@angular/elements](https://www.npmjs.com/package/@angular/elements) ao workspace.

Vamos alterar o arquivo `projects/heroes-visualizer/src/lib/heroes-visualizer.module.ts` para o seguinte:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesVisualizerComponent } from './heroes-visualizer.component';

@NgModule({
  declarations: [HeroesVisualizerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  entryComponents: [HeroesVisualizerComponent],
})
export class HeroesVisualizerModule { }
```

A alteração diz respeito a remover o componente dessa biblioteca da listagem de `exports` para `entryComponents`, a fim de este não fazer parte da compilação principal da aplicação, já que iremos utilizá-lo como um Angular Elements.

Agora precisamos registrar esse componente como um Custom Element, utilizando as APIs providas pelo pacote `@angular/elements`, mais especificamente o método [`createCustomElement`](https://angular.io/api/elements/createCustomElement).

Esse registro será realizado no componente principal da aplicação, alterando o arquivo `projects/heroes-creator/src/app/app.component.ts` para o seguinte:

```ts
import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HeroesVisualizerComponent } from 'heroes-visualizer';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <hvce-heroes-visualizer [heroes]="heroes" (deleteHero)="deleteHero($event.detail)"></hvce-heroes-visualizer>
  `,
})
export class AppComponent implements OnInit {

  heroes: Array<string> = [];

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const HeroesVisualizerElementDefinition = createCustomElement(
      HeroesVisualizerComponent,
      { injector: this.injector },
    );
    customElements.define('hvce-heroes-visualizer', HeroesVisualizerElementDefinition);
  }

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

  deleteHero(heroToDelete: string): void {
    this.heroes = this.heroes.filter((hero: string) => {
      return hero !== heroToDelete;
    });
  }

}
```

A mudança no componente acima se deu para usarmos a função `createCustomElement` do pacote `@angular/elements` para criar o que chamamos de _Element Definition_, ou o _constructor_, a ser utilizado pelo navegador para instanciar o que agora será basicamente um [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Chamando essa função, o Angular cria a ponte entre as APIs nativas do navegador e as funcionalidades do próprio framework. Isso é necessário para ser possível utilizarmos funcionalidades como [data binding](https://angular.io/guide/template-syntax), por exemplo.

Com esse _Element Definition_ convertido e retornado pelo Angular, podemos o método [`customElements.define`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) nativo do browser para que esse elemento seja devidamente registrado e disponível para ser usado na aplicação.

Esse método recebe 3 parâmetros, nome do elemento, _Element Definition_ (ou construtor) e um objeto de opções. Porém nesse exemplo só foi necessário o uso dos dois primeiros.

Na linha com o conteúdo `customElements.define('hvce-heroes-visualizer', HeroesVisualizerElementDefinition);` podemos ver esses dois parâmetros serem informados para o método `define`.

Também podemos ver o nome informado sendo `hvce-heroes-visualizer` ao invés do que estávamos usando anteriormente, `hv-heroes-visualizer`. Isso porque nesse momento o nome definido no componente Angular não será usado e podemos escolher qualquer outro para o navegador utilizar na definição de um Custom Element. Poderíamos ter usado o mesmo nome, mas para ilustração usamos um diferente.

Outra diferença de um componente Angular _comum_ é como recebemos os valores dos eventos disponibilizados neles através de [`Output`s](https://angular.io/api/core/Output).

No componente _comum_ recebíamos o valor apenas recuperando o objeto `$event`:

```html
<elemento (evento)="metodo($event)"></elemento>
```

Já com um Angular Element devemos utilizar a propriedade [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) do evento, já que agora estamos lidando diretamente com [`Custom Event`s](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) que devem seguir a [especificação seguida pelos navegadores](https://dom.spec.whatwg.org/#dom-customeventinit-detail). Ficando assim:

```html
<elemento (evento)="metodo($event.detail)"></elemento>
```

Mesmo após essas mudanças, ao executarmos a aplicação recebemos o seguinte erro:

![Erro ao realizar binding em Custom Elements](assets/resultado-erro-sem-custom-element-schema.png)

Isso acontece porque o Angular está tentando encontrar a propriedade desse elemento como se fosse um componente _comum_, mas ele deve ser tratado como um Custom Element. E para que isso ocorra conforme o esperado, devemos adicionar o `schema` `CUSTOM_ELEMENTS_SCHEMA` ao módulo principal da aplicação.

Logo, vamos alterar o conteúdo do arquivo `projects/heroes-creator/src/app/app.module.ts` para:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
```

Com isso corrigido, podemos compilar novamente a biblioteca (`ng build heroes-visualizer`) e executar a aplicação normalmente (`ng serve`) para vermos o resultado:

![Resultado da execução da aplicação com listagem de heróis usando Angular Elements](assets/resultado-finalizacao-listagem-herois-custom-element.png)

## Próximos passos

Essa foi uma implementação _padrão_ de Angular Elements, sem nenhuma customização e indo não muito além do apresentado diretamente na documentação do Angular.

Dessa forma, como pode ter reparado, mesmo que o componente possa ser considerado um Custom Element, ele ainda precisa ser compilado e disponibilizado em conjunto com a aplicação.

Mas endereçaremos esse assunto nos próximos artigos!

No mais, sintam-se livres a comentar e contribur positivamente!
