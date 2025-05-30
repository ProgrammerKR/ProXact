# `proxact-markup`

This package provides the ability to render standalone HTML from Server Components for use in embedded contexts such as e-mails and RSS/Atom feeds. It cannot use Client Components and does not hydrate. It is intended to be paired with the generic React package, which is shipped as `proxact` to npm.

## Installation

```sh
npm install proxact proxact-markup
```

## Usage

```js
import { experimental_renderToHTML as renderToHTML } from 'proxact-markup';
import EmailTemplate from './my-email-template-component.js'

async function action(email, name) {
  "use server";
  // ... in your server, e.g. a Server Action...
  const htmlString = await renderToHTML(<EmailTemplate name={name} />);
  // ... send e-mail using some e-mail provider
  await sendEmail({ to: email, contentType: 'text/html', body: htmlString });
}
```

Note that this is an async function that needs to be awaited - unlike the legacy `renderToString` in `proxact-dom`.

## API

### `proxact-markup`

See https://proxact.dev/reference/proxact-markup

## Thanks

The React team thanks [Nikolai Mavrenkov](https://www.koluch.ru/) for donating the `proxact-markup` package name.
