import React, { Component } from 'react';
import { connect } from 'react-redux';

import Builder from '../Builder/Builder';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';

import classes from './Portal.css';

class Portal extends Component {
  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <FloatingButton>add</FloatingButton>
        <Builder />
      </div>
    );
  }
}

export default connect(null, null)(Portal);
