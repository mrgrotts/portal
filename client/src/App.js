import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Auxiliary from './hoc/Auxiliary';
import asyncComponent from './hoc/asyncComponent';

import Layout from './containers/Layout/Layout';
import Portal from './containers/Portal/Portal';
import Logout from './containers/Auth/Logout/Logout';
import Builder from './containers/Builder/Builder';

import * as actions from './actions';

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncLocations = asyncComponent(() =>
  import('./containers/Locations/Locations')
);
const asyncTickets = asyncComponent(() =>
  import('./containers/Tickets/Tickets')
);
const asyncTicketCreate = asyncComponent(() =>
  import('./containers/TicketForm/TicketCreate')
);
const asyncTicketUpdate = asyncComponent(() =>
  import('./containers/TicketForm/TicketUpdate')
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
      routes = (
        <Switch>
          <Route exact path="/" component={Builder} />
          <Route path="/login" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/locations" component={asyncLocations} />
          <Route path="/tickets/create" component={asyncTicketCreate} />;
          <Route path="/tickets/:id" component={asyncTicketUpdate} />
          <Route path="/tickets" component={asyncTickets} />
          <Redirect to="/" />
        </Switch>
      );
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
