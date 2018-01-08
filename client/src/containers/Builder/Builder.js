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
  state = {
    ticket: {
      category: '',
      location: '',
      description: '',
      media: [],
      requestedDate: Date.now
    }
    // ticket: {
    //   category: {
    //     fieldType: 'input',
    //     fieldConfig: {
    //       type: 'text',
    //       placeholder: 'Category'
    //     },
    //     value: '',
    //     validation: {
    //       required: true
    //     },
    //     touched: false,
    //     valid: false
    //   },
    //   location: {
    //     fieldType: 'input',
    //     fieldConfig: {
    //       type: 'text',
    //       placeholder: 'Location'
    //     },
    //     value: '',
    //     validation: {
    //       required: true
    //     },
    //     touched: false,
    //     valid: false
    //   },
    //   description: {
    //     fieldType: 'input',
    //     fieldConfig: {
    //       type: 'text',
    //       placeholder: 'Description'
    //     },
    //     value: '',
    //     validation: {
    //       required: true
    //     },
    //     touched: false,
    //     valid: false
    //   },
    //   media: {
    //     fieldType: 'input',
    //     fieldConfig: {
    //       type: 'text',
    //       placeholder: 'Media'
    //     },
    //     value: '',
    //     validation: {
    //       required: true
    //     },
    //     touched: false,
    //     valid: false
    //   },
    //   requestedDate: {
    //     fieldType: 'input',
    //     fieldConfig: {
    //       type: 'text',
    //       placeholder: 'Requested Date'
    //     },
    //     value: '',
    //     validation: {
    //       required: true
    //     },
    //     touched: false,
    //     valid: false
    //   }
    // },
  };

  render() {
    let counter = 0;

    return (
      <div className={classes.Builder}>
        <div className={classes.title}>
          <h1>Builder Component</h1>
        </div>
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
