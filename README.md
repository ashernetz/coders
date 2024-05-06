# Project

Simple application that lists posts from [https://graphqlzero.almansi.me/](https://graphqlzero.almansi.me/).

_All operations of this app are only the ones supported by this API_.

# Context

You are now in charge of the project and there is no other developer. All the documentation there is for this project is this file.
Unfortunately, you can't contact the previous team as they are in a sabbatical, though you have full ownwership and can make any change you want. You are in charge now.
Feel free to use any library you want, make any change in the code, delete, create... It is _your_ project now.

# Tasks

Product Owner has requested some tasks, and after some technical grooming they map to the following:

- [ ] Display all posts in by `id` `DESC`.
- [ ] Only list 10 items in total
- [ ] Implement the logic for the different buttons. New elements use `<NewPostItem />`. New posts are shown on top of the list.
- [ ] Write the necessary tests to ensure new changes don't break the current logic, and tests for the new logic you add.

From the technical side we want to:

- [ ] Fix warnings in the code, linter and types
- [ ] Write a technical description of the approach taken to implement the changes, why this approach has been taken, and how it can be further improved to allow more changes in a scalable way.
- [ ] Write a technical and detailed description on what is in your opinion the best strategy to allow the app to run in environments with shaky internet connection (slow connection, intermittent connection, no connection...).

_NOTE_: In case you run out of time or your solution becomes too ambitious, just write in plain English about your solution and how you would make it happen.

# Deliverables:

- Link to a Git repository (set to public or invite @ainformatico)

# Development

## Technical stack

- Server: [Vite](https://vitejs.dev/)
- GraphQL Client: [Apollo Client](https://www.apollographql.com/docs/react/)
- Styles: [TailwindCSS](https://tailwindcss.com/docs/installation)

To run your development environment:

```bash
yarn dev
```

To run the linter:

```bash
yarn lint
```

```bash
yarn test
```

```bash
yarn compile
```

## How to run the project

This repository is configured with `devcontainer.json`, this makes it easier to run it in an isolated environment, directly from GitHub or directly on your machine.
It is up to you how you want to run it.

### GitHub Codespaces

All GitHub personal accounts come with up to 120 minutes for free. [More info](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts).

Feel free to just [Start a Codespace](https://docs.github.com/en/codespaces/getting-started/quickstart) directly from Github, so no need to install anything.

### DevPod

[DevPod](https://devpod.sh/), select the repo and [start your workspace](https://devpod.sh/docs/getting-started/quickstart-vscode)

createPost(input: CreatePostInput!): Post

```sh
input CreatePostInput {
  title: String!
  body: String!
}
```
