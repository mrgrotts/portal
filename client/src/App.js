import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import Portal from './containers/Portal/Portal';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Builder from './containers/Builder/Builder';
import Tickets from './containers/Tickets/Tickets';

import * as actions from './actions';

// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

// const asyncTickets = asyncComponent(() =>
//   import('./containers/Tickets/Tickets')
// );

class App extends Component {
  async componentDidMount() {
    await this.props.authState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route exact path="/" component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/tickets" component={Tickets} />
          <Route path="/login" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Builder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Portal>{routes}</Portal>
        </Layout>
      </div>
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
