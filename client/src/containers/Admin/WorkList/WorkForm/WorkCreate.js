import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import WorkForm from './WorkForm';

import * as actions from '../../../../actions';

class WorkCreate extends Component {
  onSubmit = async work => {
    await this.props.createWork(work);
  };

  onCancel = () => {
    this.props.history.push('/work');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <WorkForm onSubmit={this.onSubmit} onCancel={this.onCancel} />;
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/work" {...this.props.work} />
    ) : null;

    return (
      <div>
        {redirectAfterSubmit}
        <h1>Create Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  token: state.auth.token,
  loading: state.work.loading,
  success: state.work.success
});

const mapDispatchToProps = dispatch => ({
  createWork: work => dispatch(actions.createWork(work))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkCreate, api))
);
