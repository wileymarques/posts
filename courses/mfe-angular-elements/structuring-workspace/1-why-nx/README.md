---
title: What is and Why Use Nx?
summary: In this lesson, you will know the benefits of using Nx and how it compares to the Angular CLI.
---

## Benefits

Nx is one of the more innovative tools for building web applications nowadays. It's vastly inspired in the Angular CLI and brings most of its benefits.

<!-- ![Nx Home Page](assets/nx-introduction.png) -->

![Nx Home Page](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/5637755094171648?page_type=collection_lesson)

Different than the Angular CLI, Nx can handle almost any technology available for app development. Its open-source model and extensibility through plugins bring a variety of possible technologies to be used. Not only Angular projects can benefit from it, but also React, VueJS, or even those built using Vanilla JS.

<!-- ![Nx built-in supported Technologies](assets/nx-supported-technologies.png) -->

![Nx built-in supported Technologies](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/4612551769325568?page_type=collection_lesson)

With its built-in monorepo support, Nx will help us create the project we'll build together in this course. Since we'll deal not only with Angular but some other technologies, a tool like Nx is especially crucial. Using the Nx CLI we will be able to create, run and build all the projects in this course.

## Comparing to the Angular CLI

If you are used to the Angular CLI you will feel at home, because most of the commands are similar. For example, if you want to run an Angular app locally using its CLI you would run `ng serve`:

<!-- ![Example of running `ng serve`](assets/ng-serve.png) -->

![Example of running `ng serve`](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/5839150539866112?page_type=collection_lesson)

While using Nx you would run `nx serve`:

<!-- ![Example of running `nx serve`](assets/nx-serve.png) -->

![Example of running `nx serve`](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/6271529058304000?page_type=collection_lesson)

As said before, Nx also works with React and the output of the same `nx serve` command would be:

<!-- ![Example of running `nx serve` on a React app](assets/nx-serve-react.png) -->

![Example of running `nx serve` on a React app](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/5036004976623616?page_type=collection_lesson)

The other common commands used on the Angular CLI are also available on Nx, like: `test`, `lint`, and `build`.

## Going further

One advantage Nx has over the Angular CLI is the capability of running multiple commands at once. On a regular Angular project, you would have to create `npm` scripts or use a third-party library like  `concurrently`.

Nx has the `run-many` command that does all the hard work for you. Imagine you have two projects on a workspace and want to serve them, you could simply run the command `nx run-many --target=serve --all` and let Nx do its work, like below: 

<!-- ![Example of running `nx run-many`](assets/nx-run-many.png) -->

![Example of running `nx run-many`](/api/collection/6586453712175104/5197349072142336/page/5286615840194560/image/6170483577323520?page_type=collection_lesson)

Although Nx is a great tool it isn't the main object of this course, but it's important to know what you have at hand. So if you want to see more of its capabilities, go to their website: <https://nx.dev>.
