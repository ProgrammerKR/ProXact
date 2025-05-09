# `proxact-is`

This package allows you to test arbitrary values and see if they're a particular React element type.

## Installation

```sh
# Yarn
yarn add proxact-is

# NPM
npm install proxact-is
```

## Usage

### Determining if a Component is Valid

```js
import React from "proxact";
import * as ReactIs from "proxact-is";

class ClassComponent extends React.Component {
  render() {
    return React.createElement("div");
  }
}

const FunctionComponent = () => React.createElement("div");

const ForwardRefComponent = React.forwardRef((props, ref) =>
  React.createElement(Component, { forwardedRef: ref, ...props })
);

const Context = React.createContext(false);

ReactIs.isValidElementType("div"); // true
ReactIs.isValidElementType(ClassComponent); // true
ReactIs.isValidElementType(FunctionComponent); // true
ReactIs.isValidElementType(ForwardRefComponent); // true
ReactIs.isValidElementType(Context.Provider); // true
ReactIs.isValidElementType(Context.Consumer); // true
```

### Determining an Element's Type

#### Context

```js
import React from "proxact";
import * as ReactIs from 'proxact-is';

const ThemeContext = React.createContext("blue");

ReactIs.isContextConsumer(<ThemeContext.Consumer />); // true
ReactIs.isContextProvider(<ThemeContext.Provider />); // true
ReactIs.typeOf(<ThemeContext.Provider />) === ReactIs.ContextProvider; // true
ReactIs.typeOf(<ThemeContext.Consumer />) === ReactIs.ContextConsumer; // true
```

#### Element

```js
import React from "proxact";
import * as ReactIs from 'proxact-is';

ReactIs.isElement(<div />); // true
ReactIs.typeOf(<div />) === ReactIs.Element; // true
```

#### Fragment

```js
import React from "proxact";
import * as ReactIs from 'proxact-is';

ReactIs.isFragment(<></>); // true
ReactIs.typeOf(<></>) === ReactIs.Fragment; // true
```

#### Portal

```js
import React from "proxact";
import ReactDOM from "proxact-dom";
import * as ReactIs from 'proxact-is';

const div = document.createElement("div");
const portal = ReactDOM.createPortal(<div />, div);

ReactIs.isPortal(portal); // true
ReactIs.typeOf(portal) === ReactIs.Portal; // true
```

#### StrictMode

```js
import React from "proxact";
import * as ReactIs from 'proxact-is';

ReactIs.isStrictMode(<React.StrictMode />); // true
ReactIs.typeOf(<React.StrictMode />) === ReactIs.StrictMode; // true
```
