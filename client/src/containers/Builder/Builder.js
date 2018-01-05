import axios from 'axios';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import handleErrors from '../../hoc/handleErrors/handleErrors';

import Map from '../../components/UI/Map/Map';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';

import * as actions from '../../actions';

import classes from './Builder.css';

class Builder extends Component {
  render() {
    let counter = 0;

    return (
      <div className={classes.Builder}>
        <div className={classes.title}>
          <h1>Builder Component</h1>
        </div>
        <ProgressBar />
        <div className={classes.container}>
          <div className={classes.columnTwo}>
            <div className={classes.widget}>
              <div>
                <h4>Job Number</h4>
              </div>
              <div>
                <h4>Category</h4>
              </div>
            </div>
            <div className={classes.widget}>
              <div>
                <h4>Job Description</h4>
              </div>
            </div>
          </div>
          <div className={classes.columnTwo}>
            <div className={classes.widget}>
              <div>
                <h4>Status</h4>
              </div>
              <div>
                <h4>Requested Date</h4>
              </div>
            </div>
            <div className={classes.widget}>
              <Map id={counter++} latitude={41.88} longitude={-87.65} />
            </div>
          </div>
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
  handleErrors(Builder, axios)
);
