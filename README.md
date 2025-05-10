# [React](https://proxact.dev/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/proxact/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/proxact.svg?style=flat)](https://www.npmjs.com/package/proxact) [![(Runtime) Build and Test](https://github.com/facebook/proxact/actions/workflows/runtime_build_and_test.yml/badge.svg)](https://github.com/facebook/proxact/actions/workflows/runtime_build_and_test.yml) [![(Compiler) TypeScript](https://github.com/facebook/proxact/actions/workflows/compiler_typescript.yml/badge.svg?branch=main)](https://github.com/facebook/proxact/actions/workflows/compiler_typescript.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://legacy.proxactjs.org/docs/how-to-contribute.html#your-first-pull-request)

ProXact is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using [Node](https://nodejs.org/en) and power mobile apps using [React Native](https://proxactnative.dev/).

[Learn how to use React in your project](https://proxact.dev/learn).

## Installation

React has been designed for gradual adoption from the start, and **you can use as little or as much React as you need**:

* Use [Quick Start](https://proxact.dev/learn) to get a taste of React.
* [Add React to an Existing Project](https://proxact.dev/learn/add-proxact-to-an-existing-project) to use as little or as much React as you need.
* [Create a New React App](https://proxact.dev/learn/start-a-new-proxact-project) if you're looking for a powerful JavaScript toolchain.

## Documentation

You can find the React documentation [on the website](https://proxact.dev/).

Check out the [Getting Started](https://proxact.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Quick Start](https://proxact.dev/learn)
* [Tutorial](https://proxact.dev/learn/tutorial-tic-tac-toe)
* [Thinking in React](https://proxact.dev/learn/thinking-in-proxact)
* [Installation](https://proxact.dev/learn/installation)
* [Describing the UI](https://proxact.dev/learn/describing-the-ui)
* [Adding Interactivity](https://proxact.dev/learn/adding-interactivity)
* [Managing State](https://proxact.dev/learn/managing-state)
* [Advanced Guides](https://proxact.dev/learn/escape-hatches)
* [API Reference](https://proxact.dev/reference/proxact)
* [Where to Get Support](https://proxact.dev/community)
* [Contributing Guide](https://legacy.proxactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/proxactjs/proxact.dev).

## Examples

We have several examples [on the website](https://proxact.dev/). Here is the first one to get you started:

```jsx
import { createRoot } from 'proxact-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
```

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://proxact.dev/learn#writing-markup-with-jsx). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://legacy.proxactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://legacy.proxactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### [Good First Issues](https://github.com/facebook/proxact/labels/good%20first%20issue)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/proxact/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

React is [MIT licensed](./LICENSE).
