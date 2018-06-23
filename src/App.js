import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import IndexPage from './components/IndexPage';
import RegisterPage from './components/RegisterPage';

const App = () => (
  <BrowserRouter>
      <div>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/register" component={RegisterPage} />
      </div>
  </BrowserRouter>
);

export default App;