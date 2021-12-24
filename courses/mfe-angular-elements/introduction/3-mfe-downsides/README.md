## Complexity

Starting with maybe the most important aspect of software development. Complexity is something we tend to introduce without even noticing it. When we find it's too complex, it's too late to change.

Monolithic apps can be very simple to implement. But when we break it up into multiple pieces it can get very complex to do basic stuff.

Also, the most popular frameworks or libraries, designed for creating SPAs are not prepared for a complex MFE environment. React, Angular, VueJS, etc, were built with monolithic SPAs in mind.  

That leaves to us the responsibility to implement what usually is already incorporated in those tools. Or maybe to use another third-party library, which also brings complexity.

Take Angular for example. It has some features built-in to make possible the communication between two or more components. Maybe you can use shared `Service` or the Dependency Injection mechanism. Those things aren't available when you are trying to avoid lock-in to any framework.

## Performance

There are a lot of articles around the internet showing how to make an app more performant. Many of them agree that one way to accomplish that is by sending less JavaScript to the client. Which is, normally, true.

Interestingly enough, most MFE solutions rely on more JavaScript being sent to the client. So, it's very hard to create a good User Experience when dealing with this kind of apps. Also, it usually consumes more resources on the client-side.

Isolation can be considered a benefit, but it also brings an alert. If each module needs to live on its own, it must embed all of its dependencies. Which causes a dependency duplication on the client-side. Even the libraries composing the core of the framework (e.g. Angular) are duplicated. With that, MFE apps are usually much bigger than their non-MFE counterparts.

## Governance

One of the most important and at the same time ignored aspects is governance complexity. The code complexity is easier to see because it becomes harder to maintain a piece of the solution as time progresses. But the management of the app increases silently, so you see it when it's too late.

As it's possible to make any part of the app, and also the teams involved, live on its own, they can get very different solutions as the app evolves.

In monolithic apps, the integration is usually straightforward, since you can simply import an internal module of that app and interact with it. On MFE apps that's not so easy since it's distributed. For example, to run the app in a local environment you would need to run a bunch of MFE modules, instead of a single app.

On any kind of distributed architecture, things need to be well defined. Because this definition tries to mitigate the risk of things going to be different than what was expected. Taking UX for example, how will you make all modules follow the same approach?

Automation can bring some relief here. If you need to deploy multiple pieces separately, it's not always a good idea to do this manually.

## Testing

This aspect was slightly mentioned before. Since the app is broken into multiple parts it gets more complicated to tie everything together to test it well.

End-to-end tests are very welcome in any kind of app, but on MFE architecture you have to prepare more infrastructure to get every module up and running.
