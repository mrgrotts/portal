import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from '../hoc/asyncComponent';

import Dashboard from '../containers/Shared/Dashboard/Dashboard';
import Home from '../containers/Shared/Home/Home';
const asyncAuth = asyncComponent(() => import('../containers/Shared/Auth/Auth'));

const BaseRoutes = props => (
  <Switch>
    <Route path="/login" component={asyncAuth} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(BaseRoutes);
