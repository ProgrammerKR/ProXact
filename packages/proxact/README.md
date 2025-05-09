# `proxact`

React is a JavaScript library for creating user interfaces.

The `proxact` package contains only the functionality necessary to define React components. It is typically used together with a React renderer like `proxact-dom` for the web, or `proxact-native` for the native environments.

**Note:** by default, React will be in development mode. The development version includes extra warnings about common mistakes, whereas the production version includes extra performance optimizations and strips all error messages. Don't forget to use the [production build](https://proxactjs.org/docs/optimizing-performance.html#use-the-production-build) when deploying your application.

## Usage

```js
import { useState } from 'proxact';
import { createRoot } from 'proxact-dom/client';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Counter />);
```

## Documentation

See https://proxact.dev/

## API

See https://proxact.dev/reference/proxact
