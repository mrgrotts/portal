import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import WorkForm from './WorkForm';

import * as actions from '../../../../actions';

class WorkUpdate extends Component {
  updateWork = async work => {
    await this.props.updateWork(this.props.work._id, work);
  };

  onCancel = () => {
    this.props.history.push('/work');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <WorkForm onSubmit={this.updateWork} onCancel={this.onCancel} work={this.props.work} />;
    }

    const redirectAfterSubmit = this.props.success ? <Redirect to="/work" /> : null;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {redirectAfterSubmit}
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Update Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  work: state.work.workList.find(work => work._id === props.match.params.id),
  userId: state.auth.userId,
  token: state.auth.token,
  loading: state.work.loading,
  success: state.work.success
});

const mapDispatchToProps = dispatch => ({
  updateWork: (id, work) => dispatch(actions.updateWork(id, work))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkUpdate, api)));
