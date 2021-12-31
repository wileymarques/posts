<!-- Creating a New Nx Workspace -->

## Summary

In this lesson, you will see what is a Nx workspace and how to create one.

## What's a workspace

To start the development of the apps we will create a workspace using Nx, but first, let's try to understand what is a workspace.

Workspace is, simply put, a structure to hold all the projects we are going to work on. It's especially useful when working on monorepos, which are repositories with more than one project.

Each application or library inside this workspace is what we call a project. In this course, we are going to create a container app, an MFE module, and an API. Each of these will be a project in the workspace.

## Creating a workspace

Nx has a ton of options for workspace creations. It has native plugins developed by the Nx team (<https://nrwl.io>), but there are many community plugins. All of them give us great flexibility when creating our apps.

By now we will only create the workspace without any apps in it. It's important to say because by default Nx creates an app using a default configuration that you can provide during the process. But the apps will be created during the course.

So for now let's just create an empty workspace. This can be done by running the following command in the terminal:

```bash
npx create-nx-workspace mfe-angular-elements-educative --preset=empty --nx-cloud=false
```

To explain it a bit. `npx` is a Node tool used to run a Node binary without installing it. `create-nx-workspace` is the binary we want to execute, which is responsible for the creation of the workspace. `mfe-angular-elements-educative` is the name of the workspace. `--preset=empty` tells Nx to create an empty workspace. And `--nx-cloud=false` says that we don't want to use [Nx Cloud](https://nx.app).

> Don't forget to point your terminal to the directory that you want to create the workspace.
> 
> In Linux it would be: `cd directory-name`

This is the result of the command:

<!-- ![Creating a workspace using Nx CLI command](assets/create-nx-empty-workspace.png) -->
![Creating a workspace using Nx CLI command](/api/collection/6586453712175104/5197349072142336/page/5956347840954368/image/6076398241841152?page_type=collection_lesson)

This command generates a new folder where it was executed. The name of the folder will be the same provided as the name of the workspace, in this case: `mfe-angular-elements-educative`.

## Inside of a workspace

With the workspace created, you can it on your IDE of choice and see the files created there.

The main file of an Nx workspace is `workspace.json`, which now may have similar content to what's below. You can see that the `projects` property is an empty object because we created an empty workspace.

```json
{
  "version": 2,
  "projects": {}
}
```

When opening the workspace on the IDE, you can see this folder structure:

<!-- ![Workspace folder structure shown on VSCode](assets/vscode-workspace-folder-structure.png) -->
![Workspace folder structure shown on VSCode](/api/collection/6586453712175104/5197349072142336/page/5956347840954368/image/5343852092719104?page_type=collection_lesson)

> If you want to know more about this structure, follow this link to go to the official Nx doc: <https://nx.dev/l/a/getting-started/nx-setup#folder-structure>.

The most important folder for this course is the `apps` folder. You can see it's empty now, but there is where the apps will be created.

Now that our workspace is created, we can start creating the apps.