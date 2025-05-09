require(['proxact', 'proxact-dom'], function (React, ReactDOM) {
  ReactDOM.render(
    React.createElement('h1', null, 'Hello World!'),
    document.getElementById('container')
  );
});
