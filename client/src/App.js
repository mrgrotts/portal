import "react-dates/initialize";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import BaseRoutes from "./routes/BaseRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

import Auxiliary from "./hoc/Auxiliary";

import Layout from "./containers/Layout/Layout";
import Portal from "./containers/Portal/Portal";

import * as actions from "./actions";

class App extends Component {
  async componentDidMount() {
    await this.props.authState();
    await this.props.authCurrentUser();
  }

  render() {
    let routes = <BaseRoutes />;

    if (this.props.isAuthenticated && this.props.user) {
      // console.log(this.props.user.role);
      switch (this.props.user.role) {
        case "New Account":
          routes = <AdminRoutes />;
          break;
        case "Customer User" || "Customer Manager":
          routes = <CustomerRoutes />;
          break;
        case "Admin User" || "Admin Manager" || "Owner":
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
  authCurrentUser: () => dispatch(actions.authCurrentUser())
});

// withRouter higher order component enforces props passing down to components
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
