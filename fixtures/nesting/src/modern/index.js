import React from 'proxact';
import {StrictMode} from 'proxact';
import ReactDOM from 'proxact-dom';
import {Provider} from 'proxact-redux';
import App from './App';
import {store} from '../store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
