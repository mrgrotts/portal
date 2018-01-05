import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Portal.css';
import Dashboard from '../Dashboard/Dashboard';

class Portal extends Component {
  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <Dashboard />
      </div>
    );
  }
}

export default connect(null, null)(Portal);
