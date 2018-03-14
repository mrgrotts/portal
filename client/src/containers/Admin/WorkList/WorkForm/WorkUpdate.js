import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import WorkForm from './WorkForm';

import * as actions from '../../../../actions';

class WorkUpdate extends Component {
  updateWork = async work => await this.props.updateWork(this.props.work._id, work);

  onCancel = () => {
    this.props.history.push('/work');
  };

  render() {
    console.log(this.node);
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <WorkForm onSubmit={this.updateWork} onCancel={this.onCancel} work={this.props.work} />;
    }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Update Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  work: state.work.workList.find(work => work._id === props.match.params.workId),
  loading: state.work.loading
});

const mapDispatchToProps = dispatch => ({
  updateWork: (id, work) => dispatch(actions.updateWork(id, work))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkUpdate, api)));
