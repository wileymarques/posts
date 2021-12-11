In the last lesson we saw some advantages of the MFE architecture. In this one we are going to see some of its disadvantages.

It's important to know the drawbacks of anything we are thinking of implementing. That way we can minimize the risks or even not using the strategy at all.

Like the benefits, the downside are similar to what we have on Micro Services. So, let's dive in.

## Complexity

Starting with maybe the most important aspect of software development. Complexity is something we tend to introduce without even noticing it. When we find it's too complex, it's too late to change.

Monolithic apps can be very simple to implement. But when we break it up into multiple pieces it *can get very complex* to do basic stuff.

Also, the *most popular frameworks*, or libraries, designed for creating SPAs *are not really prepared for a complex MFE* environment. React, Angular, VueJS, etc, were built with monolithic SPAs in mind.  

That *leave to us the responsibility to implement* what usually is already incorporated in those tools. Or maybe to use another third-party library, which also brings complexity.

Taking Angular for example. It has some features built-in to make possible the communication between two or more components. Maybe you can use shared `Service` or the Dependency Injection mechanism. Those things aren't available when you are trying to avoid a lock-in to any framework.

## Performance

There are a lot of articles around the internet showing how to make an app more performant. Many of them agree that one way to accomplish that is sending less JavaScript to the client. Which is, normally, true.

Interesting enough, most MFE solutions rely on more JavaScript being sent to the client. So, it's very *hard to create a good User Experience* when dealing with this kind of apps. Also, it usually *consumes more resources on client-side*.

One benefit we saw on the last lesson is isolation. If each module needs to live by it's own, it must embed all of its dependencies. Which causes a *dependency duplication on the client side*. Even the libraries composing the core of the framework (e.g. Angular) are duplicated. With that, *MFE apps are usually much bigger* than their non-MFE counterparts.

## Governance / Dev Ops

- governance (ops)
  - different style in each module
  - integration costs
  - require cultural changes (?)
  - boundaries has to be well defined
  - easy to "forget" some feature, the rest of the app is getting new things and some can be left behind
  - monitoring
  - requires more automation to scale well
  - more difficult to make "global" changes
  - deployment gets more complex
  - governance is more complex
  - complex infrastructure

## Testing

- testing
  - testing is more difficult
  - debugging "global" things is harder
    - distributed debugging
  - more difficult integration or end-to-end tests

## Conclusion
