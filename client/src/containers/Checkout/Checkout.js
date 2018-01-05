import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Checkout.css';

class Checkout extends Component {
  render() {
    return (
      <div className={classes.Checkout}>
        <h1>Checkout Component</h1>
      </div>
    );
  }
}

export default connect(null, null)(Checkout);
