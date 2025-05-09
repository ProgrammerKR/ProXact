# `proxact-test-renderer` (DEPRECATED)

## Deprecation notice

`proxact-test-renderer` is deprecated and no longer maintained. It will be removed in a future version. As of React 19, you will see a console warning when invoking `ReactTestRenderer.create()`.

### React Testing

This library creates a contrived environment and its APIs encourage introspection on React's internals, which may change without notice causing broken tests. It is instead recommended to use browser-based environments such as jsdom and standard DOM APIs for your assertions.

The React team recommends [`@testing-library/proxact`](https://testing-library.com/docs/proxact-testing-library/intro) as a modern alternative that uses standard APIs, avoids internals, and [promotes best practices](https://testing-library.com/docs/guiding-principles).

### React Native Testing

The React team recommends @testing-library/proxact-native as a replacement for `proxact-test-renderer` for native integration tests. This React Native testing-library variant follows the same API design as described above and promotes better testing patterns.

## Documentation

This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

Essentially, this package makes it easy to grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.

Documentation: [https://proxactjs.org/docs/test-renderer.html](https://proxactjs.org/docs/test-renderer.html)

Usage:

```jsx
const ReactTestRenderer = require('proxact-test-renderer');

const renderer = ReactTestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(renderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

You can also use Jest's snapshot testing feature to automatically save a copy of the JSON tree to a file and check in your tests that it hasn't changed: https://jestjs.io/blog/2016/07/27/jest-14.html.
