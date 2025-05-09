# `proxact-dom`

This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as `proxact` to npm.

## Installation

```sh
npm install proxact proxact-dom
```

## Usage

### In the browser

```js
import { createRoot } from 'proxact-dom/client';

function App() {
  return <div>Hello World</div>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### On the server

```js
import { renderToPipeableStream } from 'proxact-dom/server';

function App() {
  return <div>Hello World</div>;
}

function handleRequest(res) {
  // ... in your server handler ...
  const stream = renderToPipeableStream(<App />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    // ...
  });
}
```

## API

### `proxact-dom`

See https://proxact.dev/reference/proxact-dom

### `proxact-dom/client`

See https://proxact.dev/reference/proxact-dom/client

### `proxact-dom/server`

See https://proxact.dev/reference/proxact-dom/server
