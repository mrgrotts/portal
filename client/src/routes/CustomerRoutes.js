import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from '../hoc/asyncComponent';

// CUSTOMER COMPONENTS
import Builder from '../containers/Customer/Builder/Builder';
import Logout from '../containers/Shared/Auth/Logout/Logout';
const asyncAuth = asyncComponent(() => import('../containers/Shared/Auth/Auth'));
const asyncLocations = asyncComponent(() => import('../containers/Customer/Locations/Locations'));
const asyncLocationCreate = asyncComponent(() => import('../containers/Customer/Locations/LocationForm/LocationCreate'));
const asyncLocationUpdate = asyncComponent(() => import('../containers/Customer/Locations/LocationForm/LocationUpdate'));
const asyncWorkList = asyncComponent(() => import('../containers/Customer/WorkList/WorkList'));
const asyncWorkCreate = asyncComponent(() => import('../containers/Customer/WorkList/WorkForm/WorkCreate'));
const asyncWorkUpdate = asyncComponent(() => import('../containers/Customer/WorkList/WorkForm/WorkUpdate'));

const CustomerRoutes = props => (
  <Switch>
    <Route path="/login" component={asyncAuth} />
    <Route path="/logout" component={Logout} />
    <Route path="/locations/create" component={asyncLocationCreate} />
    <Route path="/locations/:id" component={asyncLocationUpdate} />
    <Route exact path="/locations" component={asyncLocations} />
    <Route path="/work/create" component={asyncWorkCreate} />
    <Route path="/work/:id" component={asyncWorkUpdate} />
    <Route exact path="/work" component={asyncWorkList} />
    <Route exact path="/" component={Builder} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(CustomerRoutes);
