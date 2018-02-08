import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import asyncComponent from "../hoc/asyncComponent";

import Builder from "../containers/base/Builder/Builder";
const asyncAuth = asyncComponent(() => import("../containers/Auth/Auth"));

const BaseRoutes = props => (
  <Switch>
    <Route path="/login" component={asyncAuth} />
    <Route exact path="/" component={Builder} />
    <Redirect to="/" />
  </Switch>
);

export default withRouter(BaseRoutes);
