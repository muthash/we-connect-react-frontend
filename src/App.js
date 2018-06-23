import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import IndexPage from './components/index/IndexPage';
// import RegisterPage from './components/register/RegisterPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IndexPage} />

    </div>
  </BrowserRouter>
);

export default App;