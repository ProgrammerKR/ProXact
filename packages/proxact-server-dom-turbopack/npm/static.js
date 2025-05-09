'use strict';

throw new Error(
  'The React Server Writer cannot be used outside a proxact-server environment. ' +
    'You must configure Node.js using the `--conditions proxact-server` flag.'
);
