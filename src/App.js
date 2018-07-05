import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import IndexPage from './components/index/IndexPage';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import Logout from './components/login/Logout';
import ListingPage from './components/listings/ListingPage';
import DashPage from './components/dashboard/DashPage';
import RegistryPage from './components/registry/RegistryPage';
import BusinessPage from './components/business/BusinessPage';
import UpdateBiz from './components/dashboard/UpdateBiz';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
  {...rest} render={(props) => (
    localStorage.getItem('wcToken') !== null
      ? <Component {...props} />
      : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
       )
  )} />
);

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute exact path="/logout" component={Logout} />
      <PrivateRoute exact path="/listings" component={ListingPage} />
      <PrivateRoute exact path="/dashboard" component={DashPage} />
      <PrivateRoute exact path="/businesses/update/:id" component={UpdateBiz} />
      <PrivateRoute exact path="/businesses" component={RegistryPage} />
      <PrivateRoute exact path="/businesses/:id" component={BusinessPage} />
    </div>
  </BrowserRouter>
);

export default App;