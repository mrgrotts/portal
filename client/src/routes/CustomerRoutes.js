import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from '../hoc/asyncComponent';

// CUSTOMER COMPONENTS
import Builder from '../containers/Customer/Builder/Builder';
import Logout from '../containers/Shared/Auth/Logout/Logout';
const asyncAuth = asyncComponent(() =>
  import('../containers/Shared/Auth/Auth')
);
const asyncCompanyCreate = asyncComponent(() =>
  import('../containers/Admin/Company/CompanyForm/CompanyCreate')
);
const asyncCompanyUpdate = asyncComponent(() =>
  import('../containers/Admin/Company/CompanyForm/CompanyUpdate')
);
const asyncLocations = asyncComponent(() =>
  import('../containers/Customer/Locations/Locations')
);
const asyncLocationCreate = asyncComponent(() =>
  import('../containers/Customer/Locations/LocationForm/LocationCreate')
);
const asyncLocationUpdate = asyncComponent(() =>
  import('../containers/Customer/Locations/LocationForm/LocationUpdate')
);
const asyncWorkList = asyncComponent(() =>
  import('../containers/Customer/WorkList/WorkList')
);
const asyncWorkCreate = asyncComponent(() =>
  import('../containers/Customer/WorkList/WorkForm/WorkCreate')
);
const asyncWorkUpdate = asyncComponent(() =>
  import('../containers/Customer/WorkList/WorkForm/WorkUpdate')
);

const CustomerRoutes = props => (
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
    <Route path="/work/workId" component={asyncWorkUpdate} />
    <Route exact path="/work" component={asyncWorkList} />
    <Route exact path="/" component={Builder} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(CustomerRoutes);
