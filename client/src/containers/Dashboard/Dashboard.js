import axios from 'axios';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import handleErrors from '../../hoc/handleErrors/handleErrors';

import * as actions from '../../actions';

import classes from './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className={classes.Dashboard}>
        <div className={classes.title}>
          <h1>Dashboard Component</h1>
        </div>
        <div className={classes.columnTwo}>
          <div className={classes.widget}>Widget 1</div>
          <div className={classes.widget}>Widget 2</div>
        </div>
        <div className={classes.columnTwo}>
          <div className={classes.widget}>Widget 3</div>
          <div className={classes.widget}>Widget 4</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Dashboard, axios)
);
