import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Demo from './demo.js';

const App = (Component) => (
    <AppContainer>
      <Component/>
    </AppContainer>
);

render(App(Demo), document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./demo.js', () => {
    const Component = require('./demo.js').default;
    render(App(Component), document.getElementById('app'));
  });
}
