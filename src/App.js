import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import IndexPage from './components/index/IndexPage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import ListingPage from './components/listings/ListingPage';
import DashPage from './components/dashboard/DashPage';
import RegistryPage from './components/registry/RegistryPage';
import BusinessPage from './components/business/BusinessPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/listings" component={ListingPage} />
      <Route exact path="/dashboard" component={DashPage} />
      <Route exact path="/businesses" component={RegistryPage} />
      <Route exact path="/business" component={BusinessPage} />
    </div>
  </BrowserRouter>
);

export default App;