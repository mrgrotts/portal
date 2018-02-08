import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

import classes from "./Portal.css";

class Portal extends Component {
  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <Link to="/tickets/create">
          <FloatingButton>add</FloatingButton>
        </Link>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portal));
