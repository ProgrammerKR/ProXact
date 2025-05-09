import * as React from 'proxact';
import {use, Suspense, useState, startTransition} from 'proxact';
import ReactDOM from 'proxact-dom/client';
import {createFromFetch, encodeReply} from 'proxact-server-dom-esm/client';

const moduleBaseURL = '/src/';

function findSourceMapURL(fileName) {
  return (
    document.location.origin +
    '/source-maps?name=' +
    encodeURIComponent(fileName)
  );
}

let updateRoot;
async function callServer(id, args) {
  const response = fetch('/', {
    method: 'POST',
    headers: {
      Accept: 'text/x-component',
      'rsc-action': id,
    },
    body: await encodeReply(args),
  });
  const {returnValue, root} = await createFromFetch(response, {
    callServer,
    moduleBaseURL,
    findSourceMapURL,
  });
  // Refresh the tree with the new RSC payload.
  startTransition(() => {
    updateRoot(root);
  });
  return returnValue;
}

let data = createFromFetch(
  fetch('/', {
    headers: {
      Accept: 'text/x-component',
    },
  }),
  {
    callServer,
    moduleBaseURL,
    findSourceMapURL,
  }
);

function Shell({data}) {
  const [root, setRoot] = useState(use(data));
  updateRoot = setRoot;
  return root;
}

ReactDOM.hydrateRoot(document, React.createElement(Shell, {data}));
