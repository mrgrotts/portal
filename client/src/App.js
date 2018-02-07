import "react-dates/initialize";
import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Auxiliary from "./hoc/Auxiliary";
import asyncComponent from "./hoc/asyncComponent";

import Layout from "./containers/Layout/Layout";
import Portal from "./containers/Portal/Portal";
import Logout from "./containers/Auth/Logout/Logout";
import Builder from "./containers/Builder/Builder";

import * as actions from "./actions";

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
const asyncLocations = asyncComponent(() =>
  import("./containers/Locations/Locations")
);
const asyncLocationCreate = asyncComponent(() =>
  import("./containers/Locations/LocationForm/LocationCreate")
);
const asyncLocationUpdate = asyncComponent(() =>
  import("./containers/Locations/LocationForm/LocationUpdate")
);
const asyncTickets = asyncComponent(() =>
  import("./containers/Tickets/Tickets")
);
const asyncTicketCreate = asyncComponent(() =>
  import("./containers/Tickets/TicketForm/TicketCreate")
);
const asyncTicketUpdate = asyncComponent(() =>
  import("./containers/Tickets/TicketForm/TicketUpdate")
);

class App extends Component {
  async componentDidMount() {
    await this.props.authState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route exact path="/" component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      if (props.user.role.contains("Customer")) {
        routes = (
          <Switch>
            <Route path="/login" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/locations/create"
              component={asyncCustomerLocationCreate}
            />
            <Route
              path="/locations/:id"
              component={asyncCustomerLocationUpdate}
            />
            <Route path="/locations" component={asyncCustomerLocations} />
            <Route
              path="/tickets/create"
              component={asyncCustomerTicketCreate}
            />;
            <Route path="/tickets/:id" component={asyncCustomerTicketUpdate} />
            <Route path="/tickets" component={asyncCustomerTickets} />
            <Route exact path="/" component={CustomerBuilder} />
            <Redirect to="/" />
          </Switch>
        );
      } else {
        routes = (
          <Switch>
            <Route path="/login" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/locations/create" component={asyncLocationCreate} />
            <Route path="/locations/:id" component={asyncLocationUpdate} />
            <Route path="/locations" component={asyncLocations} />
            <Route path="/tickets/create" component={asyncTicketCreate} />;
            <Route path="/tickets/:id" component={asyncTicketUpdate} />
            <Route path="/tickets" component={asyncTickets} />
            <Route exact path="/" component={Builder} />
            <Redirect to="/" />
          </Switch>
        );
      }
    }

    return (
      <Auxiliary>
        <Layout>
          <Portal>{routes}</Portal>
        </Layout>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  authState: () => dispatch(actions.authState())
});

// withRouter higher order component enforces props passing down to components
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
