import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './Store';
import App from './App';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app-root')
);

export default App;
