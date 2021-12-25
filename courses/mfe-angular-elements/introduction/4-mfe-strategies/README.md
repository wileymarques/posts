There are some ways to create an MFE architecture, in this lesson you will see some of them.

The main aspect of an MFE architecture is how the modules will be integrated. Let's see the most common approaches:

## Build-time integration

Although some people don't consider this approach a real MFE architecture, a build time integration can be a way to create composable apps.

This kind of integration is usually the first attempt to motivate some independence to each team involved in a complex app. Especially because it's one of the simplest.

The separation here is done by breaking each module into a separate library. Which is versioned independently but still needs to be deployed in conjunction with the container app and the other modules.

An example of a `package.json` showing that would be:

```json
{
  "name": "container-app",
  "version": "1.0.0",
  "description": "The container app",
  "dependencies": {
    "module-one": "^2.2.3",
    "module-two": "^1.5.6"
  }
}
```

As the composition occurs during compilation, the representation of that would be:

<!-- ![Build time integration example](assets/build-time-integration.png) -->
![Build time integration example](/api/collection/6586453712175104/5197349072142336/page/4738961238392832/image/5062376730132480?page_type=collection_lesson)

This is maybe the simplest solution, but the least flexible because the entire needs to be deployed as a monolithic package.

## Server-side template composition

The approach here isn't new to web development, as it's simple as compose the template during server-side execution. An HTML representation of that would be:

```html
<html>
  <head>
    <title>Container App</title>
  </head>
  <body>
    <h1>Application</h1>
    <!--# include file="module-one.html" -->
  </body>
</html>
```

This brings the possibility to deploy every module independently. But you may need to develop a way to integrate the modules since it's not a common use case for server-side frameworks.

## iFrames

Now we come to may the most used solution nowadays. Also not a new thing in web development. iFrames. You can simply put an iframe element on the document and change its `src` pointing to the MFE module. An example of that would be:

```html
<html>
  <head>
    <title>Container App</title>
  </head>
  <body>
    <h1>Application</h1>
    <iframe src="module-one.html"></iframe>
  </body>
</html>
```

The problem here is in the solution itself: iFrame. You may know the problems that come with it. It can be difficult to style, is heavy on some browsers, and send too many resources to the client-side.

## Run-time integration

When MFE architectures got more popular, some people tried to solve them in different ways. One of them was integration using pure JavaScript. It's not so simple to explain as the other solutions presented here, but it's similar to what you saw on server-side integration.

Instead of doing everything on the server-side, the work here was moved to the client-side. As some things had to be done manually, some tools were created to help with that. One example of those tools is Single SPA, maybe the most popular one. But some time later Webpack made an excellent job introducing Module Federation.

Trying to simplify the understanding, you would have to develop something like this:

```html
<html>
  <head>
    <title>Container App</title>
  </head>
  <body>
    <h1>Application</h1>
    <div id="mfe-container"></div>
    
    <script>
      const mfeModuleOne = downloadMfeModule('module-one');
      const mfeContainerElement = document.getElementById('mfe-container');
      mfeContainerElement.innerHTML = mfeModuleOne;
    </script>
  </body>
</html>
```

The example is so simple that it wouldn't work. But I hope you got the idea. Download the module during runtime and insert it in the container element.

Although it's the most advocated solution, I think it's the most complicated one. It brings a huge maintainability cost if you try to implement that logic by hand. And brings another framework lock-in if you use an already made tool, like Single SPA.

## Web Components

The last strategy is the solution that will be used in this course. Web Components brings the simplicity of iFrames and the flexibility of the client-side integration cited before. And it also is one of the simplest ways to implement an MFE architecture.

Instead of relying on a tool or specific framework, the APIs provided by the browser is the key. Using the capabilities brought by the browser, there's no lock-in to any specific tool and can be embedded in any app.

The usage of an MFE module is also very simple. An example of that would be:

```html
<html>
  <head>
    <title>Container App</title>
  </head>
  <body>
    <h1>Application</h1>

    <script src="mfe-module-one.js"></script>
    <mfe-module-one></mfe-module-one>
 
  </body>
</html>
```

Like anything, there are some drawbacks. One of them is browser compatibility. Polyfills exist but they aren't perfect. That may be a major issue if you need to support older browsers.

The communication between the container app and the MFE modules may rely on some customization. Luckily, this is an aspect that you are going to see in this course.
