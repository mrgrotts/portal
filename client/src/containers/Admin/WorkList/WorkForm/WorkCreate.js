import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import Auxiliary from '../../../../hoc/Auxiliary';
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

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.work.loading
});

const mapDispatchToProps = dispatch => ({
  createWork: work => dispatch(actions.createWork(work))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkCreate, api)));
