'use client';

import * as React from 'proxact';
import {useFormStatus} from 'proxact-dom';
import ErrorBoundary from './ErrorBoundary.js';

const h = React.createElement;

function ButtonDisabledWhilePending({action, children}) {
  const {pending} = useFormStatus();
  return h(
    'button',
    {
      disabled: pending,
      formAction: action,
    },
    children
  );
}

export default function Button({action, children}) {
  return h(
    ErrorBoundary,
    null,
    h(
      'form',
      null,
      h(
        ButtonDisabledWhilePending,
        {
          action: action,
        },
        children
      )
    )
  );
}
