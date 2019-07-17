import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from './page-demo/demo-page.js';

const App = (Component) => (
    <AppContainer>
      <Component/>
    </AppContainer>
);

render(App(Demo), document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./page-demo/demo-page.js', () => {
    const Component = require('./page-demo/demo-page.js').default;
    render(App(Component), document.getElementById('app'));
  });
}
