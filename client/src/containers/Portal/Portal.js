import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Portal.css';
import Builder from '../Builder/Builder';

class Portal extends Component {
  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <Builder />
      </div>
    );
  }
}

export default connect(null, null)(Portal);
