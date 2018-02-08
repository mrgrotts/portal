import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import asyncComponent from "../hoc/asyncComponent";

// ADMIN COMPONENTS
import Builder from "../containers/admin/Builder/Builder";
import Logout from "../containers/Auth/Logout/Logout";
const asyncAuth = asyncComponent(() => import("../containers/Auth/Auth"));
const asyncLocations = asyncComponent(() =>
  import("../containers/admin/Locations/Locations")
);
const asyncLocationCreate = asyncComponent(() =>
  import("../containers/admin/Locations/LocationForm/LocationCreate")
);
const asyncLocationUpdate = asyncComponent(() =>
  import("../containers/admin/Locations/LocationForm/LocationUpdate")
);
const asyncTickets = asyncComponent(() =>
  import("../containers/admin/Tickets/Tickets")
);
const asyncTicketCreate = asyncComponent(() =>
  import("../containers/admin/Tickets/TicketForm/TicketCreate")
);
const asyncTicketUpdate = asyncComponent(() =>
  import("../containers/admin/Tickets/TicketForm/TicketUpdate")
);

const AdminRoutes = props => (
  <Switch>
    <Route path="/login" component={asyncAuth} />
    <Route path="/logout" component={Logout} />
    <Route path="/locations/create" component={asyncLocationCreate} />
    <Route path="/locations/:id" component={asyncLocationUpdate} />
    <Route path="/locations" component={asyncLocations} />
    <Route path="/tickets/create" component={asyncTicketCreate} />
    <Route path="/tickets/:id" component={asyncTicketUpdate} />
    <Route path="/tickets" component={asyncTickets} />
    <Route exact path="/" component={Builder} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(AdminRoutes);
