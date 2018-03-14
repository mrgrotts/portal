// import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import CSSInterface from 'react-with-styles-interface-css';
import registerCSSInterfaceNamespace from 'react-with-styles-interface-css/dist/utils/registerCSSInterfaceNamespace';
import registerInterfaceWithDefaultTheme from 'react-dates/lib/utils/registerInterfaceWithDefaultTheme';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BaseRoutes from './routes/BaseRoutes';
import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';

import Auxiliary from './hoc/Auxiliary';

import Layout from './containers/Shared/Layout/Layout';
import Portal from './containers/Shared/Portal/Portal';

import * as actions from './actions';

import './datepicker_overrides.css';

registerCSSInterfaceNamespace('_datepicker');
registerInterfaceWithDefaultTheme(CSSInterface);
class App extends Component {
  async componentDidMount() {
    await this.props.authState();

    if (this.props.isAuthenticated) {
      await this.props.authCurrentUser();
      await this.props.readCompany(this.props.user.company);
    }
  }

  render() {
    let routes = <BaseRoutes />;

    if (this.props.isAuthenticated && this.props.user) {
      // console.log(this.props.user.role, this.props.user.verified);
      switch (this.props.user.role) {
        case 'New Account':
          routes = <AdminRoutes />;
          break;
        case 'Customer User':
          routes = <CustomerRoutes />;
          break;
        case 'Customer Manager':
          routes = <CustomerRoutes />;
          break;
        case 'Admin User':
          routes = <AdminRoutes />;
          break;
        case 'Admin Manager':
          routes = <AdminRoutes />;
          break;
        case 'Admin Owner':
          routes = <AdminRoutes />;
          break;
        default:
          routes = <BaseRoutes />;
          break;
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
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  authState: () => dispatch(actions.authState()),
  authCurrentUser: () => dispatch(actions.authCurrentUser()),
  readCompany: id => dispatch(actions.readCompany(id))
});

// withRouter higher order component enforces props passing down to components
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
