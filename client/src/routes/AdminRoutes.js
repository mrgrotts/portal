import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from '../hoc/asyncComponent';

// ADMIN COMPONENTS
import Dashboard from '../containers/Admin/Dashboard/Dashboard';
import Home from '../containers/Shared/Home/Home';
import Logout from '../containers/Shared/Auth/Logout/Logout';
const asyncAuth = asyncComponent(() => import('../containers/Shared/Auth/Auth'));
const asyncCompanyCreate = asyncComponent(() => import('../containers/Admin/Company/CompanyForm/CompanyCreate'));
const asyncCompanyUpdate = asyncComponent(() => import('../containers/Admin/Company/CompanyForm/CompanyUpdate'));
const asyncLocations = asyncComponent(() => import('../containers/Admin/Locations/Locations'));
const asyncLocationCreate = asyncComponent(() => import('../containers/Admin/Locations/LocationForm/LocationCreate'));
const asyncLocationUpdate = asyncComponent(() => import('../containers/Admin/Locations/LocationForm/LocationUpdate'));
const asyncWorkList = asyncComponent(() => import('../containers/Admin/WorkList/WorkList'));
const asyncWorkCreate = asyncComponent(() => import('../containers/Admin/WorkList/WorkForm/WorkCreate'));
const asyncWorkUpdate = asyncComponent(() => import('../containers/Admin/WorkList/WorkForm/WorkUpdate'));

const AdminRoutes = props => (
  <Switch>
    <Route path="/login" component={asyncAuth} />
    <Route path="/logout" component={Logout} />
    <Route path="/companies/create" component={asyncCompanyCreate} />
    <Route path="/companies/:companyId" component={asyncCompanyUpdate} />
    {/* <Route exact path="/companies" component={asyncCompanies} /> */}
    <Route path="/locations/create" component={asyncLocationCreate} />
    <Route path="/locations/:locationId" component={asyncLocationUpdate} />
    <Route exact path="/locations" component={asyncLocations} />
    <Route path="/work/create" component={asyncWorkCreate} />
    <Route path="/work/:workId" component={asyncWorkUpdate} />
    <Route exact path="/work" component={asyncWorkList} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(AdminRoutes);
